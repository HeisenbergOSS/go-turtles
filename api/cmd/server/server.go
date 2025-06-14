// cmd/server/server.go

package main

import (
	"log"
	"net/http"
	"os"

	"github.com/99designs/gqlgen/graphql/handler"
	"github.com/99designs/gqlgen/graphql/playground"
	"github.com/go-chi/chi/v5"
	"github.com/go-chi/cors"
	"github.com/heisenbergoss/go-turtles/graph" // Change to your module path
	"github.com/heisenbergoss/go-turtles/internal/data"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

const (
	defaultPort = "8080"
	defaultDSN  = "host=localhost user=postgres dbname=turtles_db port=5432 sslmode=disable"
)

func apiKeyAuth(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		// Read the required API key from an environment variable.
		requiredKey := os.Getenv("ADMIN_API_KEY")
		if requiredKey == "" {
			// If the key is not set on the server, block all requests for safety.
			log.Println("Warning: ADMIN_API_KEY is not set. All mutation requests will be blocked.")
			http.Error(w, "Internal Server Configuration Error", http.StatusInternalServerError)
			return
		}

		// Look for the API key in the 'X-API-KEY' header of the request.
		providedKey := r.Header.Get("X-API-KEY")

		// For simplicity in this project, we will check the key on all POST requests
		// to the /query endpoint, as this is how mutations are sent.
		if r.Method == "POST" {
			if providedKey != requiredKey {
				http.Error(w, "Forbidden", http.StatusForbidden)
				return // Block the request
			}
		}

		// If the key is correct or it's not a mutation (e.g., a GET for the playground),
		// allow the request to proceed to the next handler.
		next.ServeHTTP(w, r)
	})
}

func main() {
	port := os.Getenv("PORT")
	if port == "" {
		port = defaultPort
	}

	dsn := os.Getenv("DSN")
	if dsn == "" {
		dsn = defaultDSN
	}

	db, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})
	if err != nil {
		log.Fatalf("failed to connect to database: %v", err)
	}

	// Auto-migrate the schema
	log.Println("Running database migrations...")
	db.AutoMigrate(&data.Fact{})
	log.Println("Database migration complete.")

	router := chi.NewRouter()
	router.Use(cors.Handler(cors.Options{
		AllowedOrigins:   []string{"http://localhost:5173", "https://vaccine-facts.netlify.app"},
		AllowedMethods:   []string{"GET", "POST", "OPTIONS"},
		AllowedHeaders:   []string{"Accept", "Authorization", "Content-Type", "X-CSRF-Token"},
		AllowCredentials: true,
		MaxAge:           300, // Maximum value not ignored by any browser
	}))

	resolver := &graph.Resolver{DB: db}
	srv := handler.NewDefaultServer(graph.NewExecutableSchema(graph.Config{Resolvers: resolver}))

	router.Get("/", func(w http.ResponseWriter, r *http.Request) {
		w.Write([]byte("Server is alive!"))
	})

	router.Handle("/query", apiKeyAuth(srv))
	router.Handle("/playground", playground.Handler("GraphQL playground", "/query"))
	log.Printf("GraphQL playground available at http://localhost:%s/playground", port)

	log.Printf("Server listening on http://localhost:%s/", port)
	log.Fatal(http.ListenAndServe(":"+port, router))
}
