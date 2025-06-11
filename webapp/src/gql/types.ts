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
  topLevelFacts: Array<Fact>;
};

export type QueryFactArgs = {
  id: Scalars["ID"]["input"];
};

export type GetTopLevelFactsQueryVariables = Exact<{ [key: string]: never }>;

export type GetTopLevelFactsQuery = {
  __typename?: "Query";
  topLevelFacts: Array<{
    __typename?: "Fact";
    id: string;
    title: string;
    content: string;
  }>;
};
