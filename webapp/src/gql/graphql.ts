/* eslint-disable */
import type { TypedDocumentNode as DocumentNode } from "@graphql-typed-document-node/core";
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
export type MakeEmpty<
  T extends { [key: string]: unknown },
  K extends keyof T,
> = { [_ in K]?: never };
export type Incremental<T> =
  | T
  | {
      [P in keyof T]?: P extends " $fragmentName" | "__typename" ? T[P] : never;
    };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string };
  String: { input: string; output: string };
  Boolean: { input: boolean; output: boolean };
  Int: { input: number; output: number };
  Float: { input: number; output: number };
};

export type Fact = {
  __typename?: "Fact";
  children: Array<Fact>;
  content: Scalars["String"]["output"];
  createdAt: Scalars["String"]["output"];
  id: Scalars["ID"]["output"];
  parent?: Maybe<Fact>;
  sourceURL?: Maybe<Scalars["String"]["output"]>;
  title: Scalars["String"]["output"];
  updatedAt: Scalars["String"]["output"];
};

export type Query = {
  __typename?: "Query";
  fact?: Maybe<Fact>;
  search: Array<Fact>;
  topLevelFacts: Array<Fact>;
};

export type QueryFactArgs = {
  id: Scalars["ID"]["input"];
};

export type QuerySearchArgs = {
  term: Scalars["String"]["input"];
};

export type FactDetailsL5Fragment = {
  __typename?: "Fact";
  id: string;
  title: string;
  content: string;
  sourceURL?: string | null;
} & { " $fragmentName"?: "FactDetailsL5Fragment" };

export type FactDetailsL4Fragment = ({
  __typename?: "Fact";
  children: Array<
    { __typename?: "Fact" } & {
      " $fragmentRefs"?: { FactDetailsL5Fragment: FactDetailsL5Fragment };
    }
  >;
} & { " $fragmentRefs"?: { FactDetailsL5Fragment: FactDetailsL5Fragment } }) & {
  " $fragmentName"?: "FactDetailsL4Fragment";
};

export type FactDetailsL3Fragment = ({
  __typename?: "Fact";
  children: Array<
    { __typename?: "Fact" } & {
      " $fragmentRefs"?: { FactDetailsL4Fragment: FactDetailsL4Fragment };
    }
  >;
} & { " $fragmentRefs"?: { FactDetailsL4Fragment: FactDetailsL4Fragment } }) & {
  " $fragmentName"?: "FactDetailsL3Fragment";
};

export type FactDetailsL2Fragment = ({
  __typename?: "Fact";
  children: Array<
    { __typename?: "Fact" } & {
      " $fragmentRefs"?: { FactDetailsL3Fragment: FactDetailsL3Fragment };
    }
  >;
} & { " $fragmentRefs"?: { FactDetailsL3Fragment: FactDetailsL3Fragment } }) & {
  " $fragmentName"?: "FactDetailsL2Fragment";
};

export type FactDetailsFragment = ({
  __typename?: "Fact";
  children: Array<
    { __typename?: "Fact" } & {
      " $fragmentRefs"?: { FactDetailsL2Fragment: FactDetailsL2Fragment };
    }
  >;
} & { " $fragmentRefs"?: { FactDetailsL2Fragment: FactDetailsL2Fragment } }) & {
  " $fragmentName"?: "FactDetailsFragment";
};

export type GetTopLevelFactsQueryVariables = Exact<{ [key: string]: never }>;

export type GetTopLevelFactsQuery = {
  __typename?: "Query";
  topLevelFacts: Array<
    { __typename?: "Fact" } & {
      " $fragmentRefs"?: { FactDetailsFragment: FactDetailsFragment };
    }
  >;
};

export type SearchFactsQueryVariables = Exact<{
  term: Scalars["String"]["input"];
}>;

export type SearchFactsQuery = {
  __typename?: "Query";
  search: Array<
    { __typename?: "Fact" } & {
      " $fragmentRefs"?: { FactDetailsFragment: FactDetailsFragment };
    }
  >;
};

export const FactDetailsL5FragmentDoc = {
  kind: "Document",
  definitions: [
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "FactDetailsL5" },
      typeCondition: {
        kind: "NamedType",
        name: { kind: "Name", value: "Fact" },
      },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "id" } },
          { kind: "Field", name: { kind: "Name", value: "title" } },
          { kind: "Field", name: { kind: "Name", value: "content" } },
          { kind: "Field", name: { kind: "Name", value: "sourceURL" } },
        ],
      },
    },
  ],
} as unknown as DocumentNode<FactDetailsL5Fragment, unknown>;
export const FactDetailsL4FragmentDoc = {
  kind: "Document",
  definitions: [
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "FactDetailsL4" },
      typeCondition: {
        kind: "NamedType",
        name: { kind: "Name", value: "Fact" },
      },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "FragmentSpread",
            name: { kind: "Name", value: "FactDetailsL5" },
          },
          {
            kind: "Field",
            name: { kind: "Name", value: "children" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "FragmentSpread",
                  name: { kind: "Name", value: "FactDetailsL5" },
                },
              ],
            },
          },
        ],
      },
    },
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "FactDetailsL5" },
      typeCondition: {
        kind: "NamedType",
        name: { kind: "Name", value: "Fact" },
      },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "id" } },
          { kind: "Field", name: { kind: "Name", value: "title" } },
          { kind: "Field", name: { kind: "Name", value: "content" } },
          { kind: "Field", name: { kind: "Name", value: "sourceURL" } },
        ],
      },
    },
  ],
} as unknown as DocumentNode<FactDetailsL4Fragment, unknown>;
export const FactDetailsL3FragmentDoc = {
  kind: "Document",
  definitions: [
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "FactDetailsL3" },
      typeCondition: {
        kind: "NamedType",
        name: { kind: "Name", value: "Fact" },
      },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "FragmentSpread",
            name: { kind: "Name", value: "FactDetailsL4" },
          },
          {
            kind: "Field",
            name: { kind: "Name", value: "children" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "FragmentSpread",
                  name: { kind: "Name", value: "FactDetailsL4" },
                },
              ],
            },
          },
        ],
      },
    },
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "FactDetailsL5" },
      typeCondition: {
        kind: "NamedType",
        name: { kind: "Name", value: "Fact" },
      },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "id" } },
          { kind: "Field", name: { kind: "Name", value: "title" } },
          { kind: "Field", name: { kind: "Name", value: "content" } },
          { kind: "Field", name: { kind: "Name", value: "sourceURL" } },
        ],
      },
    },
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "FactDetailsL4" },
      typeCondition: {
        kind: "NamedType",
        name: { kind: "Name", value: "Fact" },
      },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "FragmentSpread",
            name: { kind: "Name", value: "FactDetailsL5" },
          },
          {
            kind: "Field",
            name: { kind: "Name", value: "children" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "FragmentSpread",
                  name: { kind: "Name", value: "FactDetailsL5" },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<FactDetailsL3Fragment, unknown>;
export const FactDetailsL2FragmentDoc = {
  kind: "Document",
  definitions: [
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "FactDetailsL2" },
      typeCondition: {
        kind: "NamedType",
        name: { kind: "Name", value: "Fact" },
      },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "FragmentSpread",
            name: { kind: "Name", value: "FactDetailsL3" },
          },
          {
            kind: "Field",
            name: { kind: "Name", value: "children" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "FragmentSpread",
                  name: { kind: "Name", value: "FactDetailsL3" },
                },
              ],
            },
          },
        ],
      },
    },
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "FactDetailsL5" },
      typeCondition: {
        kind: "NamedType",
        name: { kind: "Name", value: "Fact" },
      },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "id" } },
          { kind: "Field", name: { kind: "Name", value: "title" } },
          { kind: "Field", name: { kind: "Name", value: "content" } },
          { kind: "Field", name: { kind: "Name", value: "sourceURL" } },
        ],
      },
    },
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "FactDetailsL4" },
      typeCondition: {
        kind: "NamedType",
        name: { kind: "Name", value: "Fact" },
      },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "FragmentSpread",
            name: { kind: "Name", value: "FactDetailsL5" },
          },
          {
            kind: "Field",
            name: { kind: "Name", value: "children" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "FragmentSpread",
                  name: { kind: "Name", value: "FactDetailsL5" },
                },
              ],
            },
          },
        ],
      },
    },
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "FactDetailsL3" },
      typeCondition: {
        kind: "NamedType",
        name: { kind: "Name", value: "Fact" },
      },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "FragmentSpread",
            name: { kind: "Name", value: "FactDetailsL4" },
          },
          {
            kind: "Field",
            name: { kind: "Name", value: "children" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "FragmentSpread",
                  name: { kind: "Name", value: "FactDetailsL4" },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<FactDetailsL2Fragment, unknown>;
export const FactDetailsFragmentDoc = {
  kind: "Document",
  definitions: [
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "FactDetails" },
      typeCondition: {
        kind: "NamedType",
        name: { kind: "Name", value: "Fact" },
      },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "FragmentSpread",
            name: { kind: "Name", value: "FactDetailsL2" },
          },
          {
            kind: "Field",
            name: { kind: "Name", value: "children" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "FragmentSpread",
                  name: { kind: "Name", value: "FactDetailsL2" },
                },
              ],
            },
          },
        ],
      },
    },
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "FactDetailsL5" },
      typeCondition: {
        kind: "NamedType",
        name: { kind: "Name", value: "Fact" },
      },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "id" } },
          { kind: "Field", name: { kind: "Name", value: "title" } },
          { kind: "Field", name: { kind: "Name", value: "content" } },
          { kind: "Field", name: { kind: "Name", value: "sourceURL" } },
        ],
      },
    },
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "FactDetailsL4" },
      typeCondition: {
        kind: "NamedType",
        name: { kind: "Name", value: "Fact" },
      },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "FragmentSpread",
            name: { kind: "Name", value: "FactDetailsL5" },
          },
          {
            kind: "Field",
            name: { kind: "Name", value: "children" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "FragmentSpread",
                  name: { kind: "Name", value: "FactDetailsL5" },
                },
              ],
            },
          },
        ],
      },
    },
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "FactDetailsL3" },
      typeCondition: {
        kind: "NamedType",
        name: { kind: "Name", value: "Fact" },
      },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "FragmentSpread",
            name: { kind: "Name", value: "FactDetailsL4" },
          },
          {
            kind: "Field",
            name: { kind: "Name", value: "children" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "FragmentSpread",
                  name: { kind: "Name", value: "FactDetailsL4" },
                },
              ],
            },
          },
        ],
      },
    },
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "FactDetailsL2" },
      typeCondition: {
        kind: "NamedType",
        name: { kind: "Name", value: "Fact" },
      },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "FragmentSpread",
            name: { kind: "Name", value: "FactDetailsL3" },
          },
          {
            kind: "Field",
            name: { kind: "Name", value: "children" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "FragmentSpread",
                  name: { kind: "Name", value: "FactDetailsL3" },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<FactDetailsFragment, unknown>;
export const GetTopLevelFactsDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "GetTopLevelFacts" },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "topLevelFacts" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "FragmentSpread",
                  name: { kind: "Name", value: "FactDetails" },
                },
              ],
            },
          },
        ],
      },
    },
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "FactDetailsL5" },
      typeCondition: {
        kind: "NamedType",
        name: { kind: "Name", value: "Fact" },
      },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "id" } },
          { kind: "Field", name: { kind: "Name", value: "title" } },
          { kind: "Field", name: { kind: "Name", value: "content" } },
          { kind: "Field", name: { kind: "Name", value: "sourceURL" } },
        ],
      },
    },
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "FactDetailsL4" },
      typeCondition: {
        kind: "NamedType",
        name: { kind: "Name", value: "Fact" },
      },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "FragmentSpread",
            name: { kind: "Name", value: "FactDetailsL5" },
          },
          {
            kind: "Field",
            name: { kind: "Name", value: "children" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "FragmentSpread",
                  name: { kind: "Name", value: "FactDetailsL5" },
                },
              ],
            },
          },
        ],
      },
    },
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "FactDetailsL3" },
      typeCondition: {
        kind: "NamedType",
        name: { kind: "Name", value: "Fact" },
      },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "FragmentSpread",
            name: { kind: "Name", value: "FactDetailsL4" },
          },
          {
            kind: "Field",
            name: { kind: "Name", value: "children" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "FragmentSpread",
                  name: { kind: "Name", value: "FactDetailsL4" },
                },
              ],
            },
          },
        ],
      },
    },
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "FactDetailsL2" },
      typeCondition: {
        kind: "NamedType",
        name: { kind: "Name", value: "Fact" },
      },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "FragmentSpread",
            name: { kind: "Name", value: "FactDetailsL3" },
          },
          {
            kind: "Field",
            name: { kind: "Name", value: "children" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "FragmentSpread",
                  name: { kind: "Name", value: "FactDetailsL3" },
                },
              ],
            },
          },
        ],
      },
    },
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "FactDetails" },
      typeCondition: {
        kind: "NamedType",
        name: { kind: "Name", value: "Fact" },
      },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "FragmentSpread",
            name: { kind: "Name", value: "FactDetailsL2" },
          },
          {
            kind: "Field",
            name: { kind: "Name", value: "children" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "FragmentSpread",
                  name: { kind: "Name", value: "FactDetailsL2" },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  GetTopLevelFactsQuery,
  GetTopLevelFactsQueryVariables
>;
export const SearchFactsDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "SearchFacts" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "term" } },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "String" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "search" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "term" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "term" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "FragmentSpread",
                  name: { kind: "Name", value: "FactDetails" },
                },
              ],
            },
          },
        ],
      },
    },
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "FactDetailsL5" },
      typeCondition: {
        kind: "NamedType",
        name: { kind: "Name", value: "Fact" },
      },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "id" } },
          { kind: "Field", name: { kind: "Name", value: "title" } },
          { kind: "Field", name: { kind: "Name", value: "content" } },
          { kind: "Field", name: { kind: "Name", value: "sourceURL" } },
        ],
      },
    },
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "FactDetailsL4" },
      typeCondition: {
        kind: "NamedType",
        name: { kind: "Name", value: "Fact" },
      },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "FragmentSpread",
            name: { kind: "Name", value: "FactDetailsL5" },
          },
          {
            kind: "Field",
            name: { kind: "Name", value: "children" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "FragmentSpread",
                  name: { kind: "Name", value: "FactDetailsL5" },
                },
              ],
            },
          },
        ],
      },
    },
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "FactDetailsL3" },
      typeCondition: {
        kind: "NamedType",
        name: { kind: "Name", value: "Fact" },
      },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "FragmentSpread",
            name: { kind: "Name", value: "FactDetailsL4" },
          },
          {
            kind: "Field",
            name: { kind: "Name", value: "children" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "FragmentSpread",
                  name: { kind: "Name", value: "FactDetailsL4" },
                },
              ],
            },
          },
        ],
      },
    },
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "FactDetailsL2" },
      typeCondition: {
        kind: "NamedType",
        name: { kind: "Name", value: "Fact" },
      },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "FragmentSpread",
            name: { kind: "Name", value: "FactDetailsL3" },
          },
          {
            kind: "Field",
            name: { kind: "Name", value: "children" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "FragmentSpread",
                  name: { kind: "Name", value: "FactDetailsL3" },
                },
              ],
            },
          },
        ],
      },
    },
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "FactDetails" },
      typeCondition: {
        kind: "NamedType",
        name: { kind: "Name", value: "Fact" },
      },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "FragmentSpread",
            name: { kind: "Name", value: "FactDetailsL2" },
          },
          {
            kind: "Field",
            name: { kind: "Name", value: "children" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "FragmentSpread",
                  name: { kind: "Name", value: "FactDetailsL2" },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<SearchFactsQuery, SearchFactsQueryVariables>;

