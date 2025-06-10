package data

import "gorm.io/gorm"

// Fact represents a single piece of information in our "turtles" hierarchy.
type Fact struct {
	gorm.Model // Includes fields like ID, CreatedAt, UpdatedAt, DeletedAt

	ParentID  *uint  // Use a pointer to allow for NULL (for top-level facts)
	Title     string `gorm:"not null"`
	Content   string `gorm:"not null"`
	SourceURL string

	// Defines the relationship for GORM
	Parent   *Fact   `gorm:"foreignKey:ParentID"`
	Children []*Fact `gorm:"foreignKey:ParentID"`
}
