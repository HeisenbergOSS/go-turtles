package main

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/heisenbergoss/go-turtles/models"
	"gorm.io/driver/postgres"
	"gorm.io/gen"
	"gorm.io/gorm"
)

func main() {
	// Initialize database
	dsn := "host=localhost user=postgres password=secret dbname=turtles port=5432"
	db, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})
	if err != nil {
		panic("failed to connect database")
	}

	// Configure gen
	g := gen.NewGenerator(gen.Config{
		OutPath: "./dal",
		Mode:    gen.WithDefaultQuery | gen.WithQueryInterface,
	})
	g.UseDB(db)
	g.GenerateModel("content", gen.FieldType("id", "uuid.UUID"), gen.FieldType("contributor_id", "*uuid.UUID"))
	g.Execute()

	// Initialize Gin
	r := gin.Default()

	// Sample endpoint
	r.GET("/api/v1/content/:id", func(c *gin.Context) {
		id := c.Param("id")
		var content models.Content
		if err := db.Where("id = ?", id).First(&content).Error; err != nil {
			c.JSON(http.StatusNotFound, gin.H{"error": "Content not found"})
			return
		}
		c.JSON(http.StatusOK, content)
	})

	r.Run(":8080")
}
