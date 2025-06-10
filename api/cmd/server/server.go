// cmd/server/server.go

package main

import (
	"context"
	"log"
	"net/http"
	"os"

	"github.com/99designs/gqlgen/graphql/handler"
	"github.com/99designs/gqlgen/graphql/playground"
	"github.com/go-chi/chi/v5"
	"github.com/heisenbergoss/go-turtles/graph" // Change to your module path
	"github.com/heisenbergoss/go-turtles/internal/data"
	"github.com/heisenbergoss/go-turtles/internal/data/query"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

const (
	defaultPort = "8080"
	DSN         = "host=localhost user=postgres dbname=turtles_db port=5432 sslmode=disable"
)

func main() {
	port := os.Getenv("PORT")
	if port == "" {
		port = defaultPort
	}

	db, err := gorm.Open(postgres.Open(DSN), &gorm.Config{})
	if err != nil {
		log.Fatalf("failed to connect to database: %v", err)
	}

	// Auto-migrate the schema
	log.Println("Running database migrations...")
	db.AutoMigrate(&data.Fact{})
	log.Println("Database migration complete.")

	router := chi.NewRouter()

	resolver := &graph.Resolver{DB: db}
	srv := handler.NewDefaultServer(graph.NewExecutableSchema(graph.Config{Resolvers: resolver}))

	router.Get("/", func(w http.ResponseWriter, r *http.Request) {
		w.Write([]byte("Server is alive!"))
	})

	router.Handle("/query", srv)
	router.Handle("/playground", playground.Handler("GraphQL playground", "/query"))
	log.Printf("GraphQL playground available at http://localhost:%s/playground", port)

	log.Printf("Server listening on http://localhost:%s/", port)
	log.Fatal(http.ListenAndServe(":"+port, router))
}

func seedDatabase(db *gorm.DB) error {
	q := query.Use(db)

	// Check if data already exists to prevent seeding multiple times
	count, err := q.Fact.WithContext(context.Background()).Count()
	if err != nil {
		return err
	}
	if count > 0 {
		log.Println("Database already seeded.")
		return nil
	}

	log.Println("Seeding database...")

	// Level 1 "Turtle"
	fact1 := &data.Fact{
		Title:     "MMR Vaccine is Highly Effective",
		Content:   "The MMR vaccine is about 97% effective at preventing measles and 88% effective at preventing mumps.",
		SourceURL: "https://www.cdc.gov/vaccines/vpd/mmr/public/index.html",
	}

	if err := q.Fact.WithContext(context.Background()).Create(fact1); err != nil {
		return err
	}

	// Level 2 "Turtles" (Children of Fact 1)
	fact2 := &data.Fact{
		ParentID:  &fact1.ID, // Link to parent
		Title:     "Measles Efficacy Study",
		Content:   "A 2019 meta-analysis of 50 studies confirmed the high efficacy of two doses of the MMR vaccine against measles.",
		SourceURL: "https://www.cochrane.org/CD004407/hsg_measles-mumps-and-rubella-mmr-vaccine-preventing-measles-mumps-and-rubella-children",
	}

	fact3 := &data.Fact{
		ParentID:  &fact1.ID, // Link to parent
		Title:     "Mumps Efficacy Study",
		Content:   "Effectiveness against mumps is documented to be slightly lower than measles but still provides significant community protection.",
		SourceURL: "https://www.cdc.gov/vaccines/vpd/mumps/hcp/about.html",
	}

	return q.Fact.WithContext(context.Background()).Create(fact2, fact3)
}
