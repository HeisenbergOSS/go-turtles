//go:build ignore
// +build ignore

package main

import (
	"log"
	"os"

	"github.com/heisenbergoss/go-turtles/internal/data" // Change to your module path
	"gorm.io/driver/postgres"
	"gorm.io/gen"
	"gorm.io/gorm"
)

// The Database Connection String (DSN)
// It uses the credentials from our docker-compose.yml file
const defaultDSN = "host=localhost user=postgres dbname=turtles_db port=5432 sslmode=disable"

// FactQuerier defines the custom queries we want for our Fact model.
type FactQuerier interface {
	// SELECT * FROM @@table WHERE id = @id LIMIT 1
	FirstByID(id uint) (*data.Fact, error)
}

func main() {
	dsn := os.Getenv("DSN")
	if dsn == "" {
		dsn = defaultDSN
	}

	// Connect to the database
	db, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})
	if err != nil {
		panic(err)
	}

	// Create a new generator instance
	g := gen.NewGenerator(gen.Config{
		OutPath:      "./query", // The folder where we want to save generated code
		ModelPkgPath: "data",    // The package name of our model
		Mode:         gen.WithoutContext | gen.WithDefaultQuery | gen.WithQueryInterface,
	})

	g.UseDB(db)

	log.Println("Applying basic model...")
	g.ApplyBasic(data.Fact{})

	log.Println("Applying custom interface 'FactQuerier'...")
	g.ApplyInterface(func(FactQuerier) {}, data.Fact{})

	log.Println("Executing code generation...")
	g.Execute()
	log.Println("Code generation complete.")
}
