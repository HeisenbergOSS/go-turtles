package graph

import (
	"strconv"

	"github.com/heisenbergoss/go-turtles/graph/model"
	"github.com/heisenbergoss/go-turtles/internal/data"
)

func toGraphQLFact(f *data.Fact) *model.Fact {
	if f == nil {
		return nil
	}
	return &model.Fact{
		ID:        strconv.Itoa(int(f.ID)), // Convert uint ID to string for GraphQL
		Title:     f.Title,
		Content:   f.Content,
		SourceURL: &f.SourceURL,
		Parent:    toGraphQLFact(f.Parent),       // Recursively convert the parent
		Children:  toGraphQLFactList(f.Children), // Convert the list of children
		CreatedAt: f.CreatedAt.String(),
		UpdatedAt: f.UpdatedAt.String(),
	}
}

func toGraphQLFactList(facts []*data.Fact) []*model.Fact {
	out := make([]*model.Fact, len(facts))
	for i, f := range facts {
		out[i] = toGraphQLFact(f)
	}
	return out
}
