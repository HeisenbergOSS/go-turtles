package graph_test

import (
	"context"
	"testing"
	"time"

	"github.com/stretchr/testify/require"
	"github.com/testcontainers/testcontainers-go"
	"github.com/testcontainers/testcontainers-go/modules/postgres"
	"github.com/testcontainers/testcontainers-go/wait"
	"gorm.io/gorm"

	// --- FIX 1: Alias the GORM postgres driver import ---
	gormpostgres "gorm.io/driver/postgres"

	"github.com/heisenbergoss/go-turtles/graph"
	"github.com/heisenbergoss/go-turtles/internal/data"
)

// setupTestDB starts a fresh PostgreSQL container for our test.
func setupTestDB(t *testing.T) (*gorm.DB, func()) {
	ctx := context.Background()

	pgContainer, err := postgres.RunContainer(ctx,
		testcontainers.WithImage("postgres:15-alpine"),
		postgres.WithDatabase("test-db"),
		postgres.WithUsername("user"),
		postgres.WithPassword("password"),
		testcontainers.WithWaitStrategy(
			wait.ForLog("database system is ready to accept connections").
				WithOccurrence(2).
				WithStartupTimeout(5*time.Minute),
		),
	)
	require.NoError(t, err, "Failed to start postgres container")

	connStr, err := pgContainer.ConnectionString(ctx, "sslmode=disable")
	require.NoError(t, err)

	// --- FIX 2: Use the aliased import name ---
	db, err := gorm.Open(gormpostgres.Open(connStr), &gorm.Config{})
	require.NoError(t, err)

	err = db.AutoMigrate(&data.Fact{})
	require.NoError(t, err)

	cleanup := func() {
		if err := pgContainer.Terminate(ctx); err != nil {
			t.Fatalf("failed to terminate container: %s", err)
		}
	}

	return db, cleanup
}

// TestTopLevelFactsResolver tests our topLevelFacts query.
func TestTopLevelFactsResolver(t *testing.T) {
	db, cleanup := setupTestDB(t)
	defer cleanup()

	topFact := data.Fact{Title: "Top Level Fact 1", Content: "Content 1"}
	childFact := data.Fact{Title: "Child Fact 1", Content: "Content 2"}

	db.Create(&topFact)
	// Important: The ParentID needs to be a pointer to the ID
	childFact.ParentID = &topFact.ID
	db.Create(&childFact)
	db.Create(&data.Fact{Title: "Top Level Fact 2", Content: "Content 3"})

	resolver := &graph.Resolver{DB: db}
	q := resolver.Query()

	results, err := q.TopLevelFacts(context.Background())

	require.NoError(t, err, "TopLevelFacts should not return an error")
	require.NotNil(t, results, "Results should not be nil")
	require.Len(t, results, 2, "There should be exactly 2 top-level facts")
	require.Equal(t, "Top Level Fact 1", results[0].Title, "The first fact's title should match")
}
