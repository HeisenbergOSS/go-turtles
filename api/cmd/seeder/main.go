package main

import (
	"encoding/json"
	"fmt"
	"os"

	"github.com/heisenbergoss/go-turtles/internal/data"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

// SeedFact defines the structure for unmarshalling the JSON data.
// It must match the structure of our seed.json file.
type SeedFact struct {
	Title     string     `json:"title"`
	Content   string     `json:"content"`
	SourceURL string     `json:"sourceURL"`
	Children  []SeedFact `json:"children"`
}

const DSN = "host=localhost user=postgres dbname=turtles_db port=5432 sslmode=disable"

func main() {
	fmt.Println("Starting database seeder...")

	// 1. Connect to the database
	db, err := gorm.Open(postgres.Open(DSN), &gorm.Config{})
	if err != nil {
		panic(fmt.Sprintf("Failed to connect to database: %v", err))
	}

	// 2. Read the JSON seed file
	byteValue, err := os.ReadFile("seed.json")
	if err != nil {
		panic(fmt.Sprintf("Failed to read seed.json: %v", err))
	}

	var root struct {
		Facts []SeedFact `json:"facts"`
	}
	json.Unmarshal(byteValue, &root)

	// 3. Use a database transaction for safety.
	// If any part of the seeding fails, the entire operation will be rolled back.
	err = db.Transaction(func(tx *gorm.DB) error {
		fmt.Println("Wiping existing data...")
		// Wiping tables ensures a clean slate on every run.
		// The Unscoped() is important to permanently delete, bypassing GORM's soft delete.
		if err := tx.Unscoped().Where("1 = 1").Delete(&data.Fact{}).Error; err != nil {
			return err
		}
		fmt.Println("Setting up full-text search...")

		if err := tx.Exec(`ALTER TABLE facts ADD COLUMN IF NOT EXISTS search_vector tsvector`).Error; err != nil {
			return err
		}
		// 2. Create an index on this column for performance.
		if err := tx.Exec(`CREATE INDEX IF NOT EXISTS facts_search_idx ON facts USING gin(search_vector)`).Error; err != nil {
			return err
		}
		// 3. Create a trigger that automatically updates the search_vector when a row is changed.
		if err := tx.Exec(`
            CREATE OR REPLACE FUNCTION facts_search_trigger() RETURNS trigger AS $$
            begin
                new.search_vector :=
                    setweight(to_tsvector('pg_catalog.english', coalesce(new.title,'')), 'A') ||
                    setweight(to_tsvector('pg_catalog.english', coalesce(new.content,'')), 'B');
                return new;
            end
            $$ LANGUAGE plpgsql;
        `).Error; err != nil {
			return err
		}
		// 4. Attach the trigger to our table.
		if err := tx.Exec(`
            DROP TRIGGER IF EXISTS tsvectorupdate ON facts;
            CREATE TRIGGER tsvectorupdate BEFORE INSERT OR UPDATE
            ON facts FOR EACH ROW EXECUTE PROCEDURE facts_search_trigger();
        `).Error; err != nil {
			return err
		}

		fmt.Println("Seeding new data...")
		// Recursively create facts from the parsed JSON
		for _, seedFact := range root.Facts {
			if err := createFact(tx, seedFact, nil); err != nil {
				return err
			}
		}
		return nil
	})
	if err != nil {
		panic(fmt.Sprintf("Failed to seed database: %v", err))
	}

	fmt.Println("Database seeded successfully!")
}

// createFact is a recursive function that creates a fact and all its children.
func createFact(tx *gorm.DB, seedFact SeedFact, parentID *uint) error {
	// Create the current fact record
	fact := data.Fact{
		ParentID:  parentID,
		Title:     seedFact.Title,
		Content:   seedFact.Content,
		SourceURL: seedFact.SourceURL,
	}

	if err := tx.Create(&fact).Error; err != nil {
		return err
	}

	// If there are children, recursively call this function for each of them,
	// passing the ID of the fact we just created as their parentID.
	if len(seedFact.Children) > 0 {
		for _, childFact := range seedFact.Children {
			if err := createFact(tx, childFact, &fact.ID); err != nil {
				return err
			}
		}
	}

	return nil
}
