/* eslint-disable */
import * as types from "./graphql";
import type { TypedDocumentNode as DocumentNode } from "@graphql-typed-document-node/core";

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 * Learn more about it here: https://the-guild.dev/graphql/codegen/plugins/presets/preset-client#reducing-bundle-size
 */
type Documents = {
  "fragment FactDetailsL5 on Fact {\n  id\n  title\n  content\n  sourceURL\n}\n\nfragment FactDetailsL4 on Fact {\n  ...FactDetailsL5\n  children {\n    ...FactDetailsL5\n  }\n}\n\nfragment FactDetailsL3 on Fact {\n  ...FactDetailsL4\n  children {\n    ...FactDetailsL4\n  }\n}\n\nfragment FactDetailsL2 on Fact {\n  ...FactDetailsL3\n  children {\n    ...FactDetailsL3\n  }\n}\n\nfragment FactDetails on Fact {\n  ...FactDetailsL2\n  children {\n    ...FactDetailsL2\n  }\n}": typeof types.FactDetailsL5FragmentDoc;
  "query GetTopLevelFacts {\n  topLevelFacts {\n    ...FactDetails\n  }\n}\n\nquery SearchFacts($term: String!) {\n  search(term: $term) {\n    ...FactDetails\n  }\n}": typeof types.GetTopLevelFactsDocument;
};
const documents: Documents = {
  "fragment FactDetailsL5 on Fact {\n  id\n  title\n  content\n  sourceURL\n}\n\nfragment FactDetailsL4 on Fact {\n  ...FactDetailsL5\n  children {\n    ...FactDetailsL5\n  }\n}\n\nfragment FactDetailsL3 on Fact {\n  ...FactDetailsL4\n  children {\n    ...FactDetailsL4\n  }\n}\n\nfragment FactDetailsL2 on Fact {\n  ...FactDetailsL3\n  children {\n    ...FactDetailsL3\n  }\n}\n\nfragment FactDetails on Fact {\n  ...FactDetailsL2\n  children {\n    ...FactDetailsL2\n  }\n}":
    types.FactDetailsL5FragmentDoc,
  "query GetTopLevelFacts {\n  topLevelFacts {\n    ...FactDetails\n  }\n}\n\nquery SearchFacts($term: String!) {\n  search(term: $term) {\n    ...FactDetails\n  }\n}":
    types.GetTopLevelFactsDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "fragment FactDetailsL5 on Fact {\n  id\n  title\n  content\n  sourceURL\n}\n\nfragment FactDetailsL4 on Fact {\n  ...FactDetailsL5\n  children {\n    ...FactDetailsL5\n  }\n}\n\nfragment FactDetailsL3 on Fact {\n  ...FactDetailsL4\n  children {\n    ...FactDetailsL4\n  }\n}\n\nfragment FactDetailsL2 on Fact {\n  ...FactDetailsL3\n  children {\n    ...FactDetailsL3\n  }\n}\n\nfragment FactDetails on Fact {\n  ...FactDetailsL2\n  children {\n    ...FactDetailsL2\n  }\n}",
): (typeof documents)["fragment FactDetailsL5 on Fact {\n  id\n  title\n  content\n  sourceURL\n}\n\nfragment FactDetailsL4 on Fact {\n  ...FactDetailsL5\n  children {\n    ...FactDetailsL5\n  }\n}\n\nfragment FactDetailsL3 on Fact {\n  ...FactDetailsL4\n  children {\n    ...FactDetailsL4\n  }\n}\n\nfragment FactDetailsL2 on Fact {\n  ...FactDetailsL3\n  children {\n    ...FactDetailsL3\n  }\n}\n\nfragment FactDetails on Fact {\n  ...FactDetailsL2\n  children {\n    ...FactDetailsL2\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "query GetTopLevelFacts {\n  topLevelFacts {\n    ...FactDetails\n  }\n}\n\nquery SearchFacts($term: String!) {\n  search(term: $term) {\n    ...FactDetails\n  }\n}",
): (typeof documents)["query GetTopLevelFacts {\n  topLevelFacts {\n    ...FactDetails\n  }\n}\n\nquery SearchFacts($term: String!) {\n  search(term: $term) {\n    ...FactDetails\n  }\n}"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> =
  TDocumentNode extends DocumentNode<infer TType, any> ? TType : never;

