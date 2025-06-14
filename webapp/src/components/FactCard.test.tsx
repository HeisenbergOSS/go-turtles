import { render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { describe, it, expect } from "vitest";
import { FactCard } from "./FactCard";

// 1. Import MockedProvider for mocking Apollo Client hooks
import { MockedProvider } from "@apollo/client/testing";
// 2. Import the generated types and GraphQL documents we need for mocking
import {
  type FactDetailsFragment,
  GetFactChildrenDocument,
} from "../graphql/generated";

// 3. Create mock data that matches the CURRENT fragment shapes
const mockChildFact: FactDetailsFragment = {
  __typename: "Fact",
  id: "2",
  title: "This is the Child Fact",
  content: "Evidence content.",
  sourceURL: null,
  children: [],
};

const mockParentFact: FactDetailsFragment = {
  __typename: "Fact",
  id: "1",
  title: "This is the Parent Fact",
  content: "Parent content.",
  sourceURL: "https://example.com",
  // The parent only knows the ID of its children initially
  children: [{ id: "2", __typename: "Fact" }],
};

// 4. Define the mocked GraphQL response for our lazy query
const mocks = [
  {
    request: {
      query: GetFactChildrenDocument,
      variables: {
        id: "1", // We expect a query for the parent's ID
      },
    },
    // This is the data we will return when that query is made
    result: {
      data: {
        fact: {
          __typename: "Fact",
          children: [mockChildFact],
        },
      },
    },
  },
];

describe("FactCard Component (with Lazy Query)", () => {
  it("should render the initial fact content", () => {
    render(
      <MockedProvider mocks={mocks}>
        <FactCard fact={mockParentFact} />
      </MockedProvider>,
    );
    expect(screen.getByText("This is the Parent Fact")).toBeInTheDocument();
    expect(screen.getByText("Source")).toBeInTheDocument();
  });

  it("should fetch and display children when the button is clicked", async () => {
    const user = userEvent.setup();
    render(
      <MockedProvider mocks={mocks}>
        <FactCard fact={mockParentFact} />
      </MockedProvider>,
    );

    expect(
      screen.queryByText("This is the Child Fact"),
    ).not.toBeInTheDocument();

    const button = screen.getByRole("button", { name: /Show Evidence/i });
    await user.click(button);

    // This is the most important assertion: we wait for the final state
    // where the child fact's title has appeared in the document.
    expect(
      await screen.findByText("This is the Child Fact"),
    ).toBeInTheDocument();
  });
});
