package main

import (
	"context"
	"encoding/json"
	"net/http"
	"os"
	"time"

	"github.com/aws/aws-sdk-go-v2/aws"
	"github.com/aws/aws-sdk-go-v2/config"
	"github.com/aws/aws-sdk-go-v2/service/kms"
	"github.com/aws/aws-sdk-go-v2/service/secretsmanager"
	"github.com/casbin/casbin/v2"
	gormadapter "github.com/casbin/gorm-adapter/v3"
	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
	"github.com/heisenbergoss/go-turtles/models"
	"github.com/samber/lo"
	"gorm.io/driver/postgres"
	"gorm.io/gen"
	"gorm.io/gorm"
)

// ContributionRequest defines the input structure for POST /api/v1/contribute.
type ContributionRequest struct {
	Title       string `json:"title" binding:"required,min=3,max=255"`
	Body        string `json:"body" binding:"required,min=10"`
	Category    string `json:"category" binding:"required,oneof=vaccine_safety vaccine_efficacy myth"`
	VaccineType string `json:"vaccine_type" binding:"required,max=50"`
	SourceURL   string `json:"source_url" binding:"required,url,max=255"`
}

// ContributionResponse defines the output structure for the contribution.
type ContributionResponse struct {
	ID        uuid.UUID `json:"id"`
	Title     string    `json:"title"`
	CreatedAt time.Time `json:"created_at"`
}

// App holds application dependencies.
type App struct {
	DB        *gorm.DB
	KMSClient *kms.Client
	Enforcer  *casbin.Enforcer
}

// ContributeHandler handles POST /api/v1/contribute requests.
func (app *App) ContributeHandler(c *gin.Context) {
	// Extract user context from JWT middleware
	userIDStr, exists := c.Get("user_id")
	if !exists {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Unauthorized"})
		return
	}
	userID, err := uuid.Parse(userIDStr.(string))
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Invalid user ID"})
		return
	}

	// Enforce RBAC with casbin
	allowed, err := app.Enforcer.Enforce(userIDStr, "/api/v1/contribute", "POST")
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Internal server error"})
		return
	}
	if !allowed {
		c.JSON(http.StatusForbidden, gin.H{"error": "Forbidden: Insufficient permissions"})
		return
	}

	// Bind and validate input
	var req ContributionRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid input: " + err.Error()})
		return
	}

	// Generate encrypted metadata with AWS KMS
	metadata := map[string]string{
		"contributor_id": lo.If(exists, userIDStr.(string)).Else("anonymous"),
		"timestamp":      time.Now().UTC().String(),
	}
	metadataBytes, err := json.Marshal(metadata)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to process metadata"})
		return
	}

	encryptOutput, err := app.KMSClient.Encrypt(context.Background(), &kms.EncryptInput{
		KeyId:     aws.String("alias/turtles-kms-key"),
		Plaintext: metadataBytes,
	})
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to encrypt metadata"})
		return
	}

	// Create content record
	content := models.Content{
		ID:                uuid.New(),
		Title:             req.Title,
		Body:              req.Body,
		Category:          req.Category,
		VaccineType:       req.VaccineType,
		SourceURL:         req.SourceURL,
		ContributorID:     nil,
		EncryptedMetadata: encryptOutput.CiphertextBlob,
		Status:            "pending",
		CreatedAt:         time.Now().UTC(),
		UpdatedAt:         time.Now().UTC(),
	}
	if err := app.DB.Create(&content).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to save contribution"})
		return
	}

	// Log action in AuditLogs
	auditLog := models.AuditLog{
		ID:        uuid.New(),
		UserID:    nil,
		Action:    "create_contribution",
		Resource:  "content:" + content.ID.String(),
		CreatedAt: time.Now().UTC(),
	}
	if err := app.DB.Create(&auditLog).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to log action"})
		return
	}

	// Prepare response
	response := ContributionResponse{
		ID:        content.ID,
		Title:     content.Title,
		CreatedAt: content.CreatedAt,
	}
	c.JSON(http.StatusCreated, response)
}

// JWTMiddleware is a placeholder for JWT authentication.
func JWTMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		// TODO: Implement JWT validation
		c.Set("user_id", "00000000-0000-0000-0000-000000000001")
		c.Next()
	}
}

func main() {
	// Load AWS configuration
	cfg, err := config.LoadDefaultConfig(context.Background())
	if err != nil {
		panic("failed to load AWS config: " + err.Error())
	}

	// Retrieve DB credentials from Secrets Manager
	secretsClient := secretsmanager.NewFromConfig(cfg)
	secretOutput, err := secretsClient.GetSecretValue(context.Background(), &secretsmanager.GetSecretValueInput{
		SecretId: aws.String("turtles/db/credentials"),
	})
	if err != nil {
		panic("failed to retrieve secret: " + err.Error())
	}
	var dbCredentials struct {
		Username string `json:"username"`
		Password string `json:"password"`
	}
	if err := json.Unmarshal([]byte(*secretOutput.SecretString), &dbCredentials); err != nil {
		panic("failed to parse secret: " + err.Error())
	}

	// Initialize database
	dbHost := os.Getenv("DB_HOST")
	dbPort := os.Getenv("DB_PORT")
	dbName := os.Getenv("DB_NAME")
	dsn := "host=" + dbHost + " port=" + dbPort + " user=" + dbCredentials.Username + " password=" + dbCredentials.Password + " dbname=" + dbName + " sslmode=disable"
	db, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})
	if err != nil {
		panic("failed to connect database: " + err.Error())
	}

	// Auto-migrate models
	db.AutoMigrate(&models.Content{}, &models.AuditLog{})

	// Configure gen
	g := gen.NewGenerator(gen.Config{
		OutPath: "./dal",
		Mode:    gen.WithDefaultQuery | gen.WithQueryInterface,
	})
	g.UseDB(db)
	g.GenerateModel("content", gen.FieldType("id", "uuid.UUID"), gen.FieldType("contributor_id", "*uuid.UUID"), gen.FieldType("encrypted_metadata", "[]byte"))
	g.GenerateModel("audit_logs", gen.FieldType("id", "uuid.UUID"), gen.FieldType("user_id", "*uuid.UUID"))
	g.Execute()

	// Initialize KMS
	kmsClient := kms.NewFromConfig(cfg)

	// Initialize casbin
	adapter, err := gormadapter.NewAdapterByDB(db)
	if err != nil {
		panic("failed to initialize casbin adapter: " + err.Error())
	}
	enforcer, err := casbin.NewEnforcer("./config/rbac_model.conf", adapter)
	if err != nil {
		panic("failed to initialize casbin: " + err.Error())
	}
	enforcer.AddPolicy("Contributor", "/api/v1/contribute", "POST")

	// Initialize application
	app := &App{
		DB:        db,
		KMSClient: kmsClient,
		Enforcer:  enforcer,
	}

	// Initialize Gin
	r := gin.Default()

	// Routes
	r.GET("/api/v1/content/:id", func(c *gin.Context) {
		id := c.Param("id")
		var content models.Content
		if err := db.Where("id = ?", id).First(&content).Error; err != nil {
			c.JSON(http.StatusNotFound, gin.H{"error": "Content not found"})
			return
		}
		c.JSON(http.StatusOK, content)
	})

	api := r.Group("/api/v1", JWTMiddleware())
	{
		api.POST("/contribute", app.ContributeHandler)
	}

	r.Run(":8080")
}
