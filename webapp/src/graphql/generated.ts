import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type Fact = {
  __typename?: 'Fact';
  children: Array<Fact>;
  content: Scalars['String']['output'];
  createdAt: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  parent?: Maybe<Fact>;
  sourceURL?: Maybe<Scalars['String']['output']>;
  title: Scalars['String']['output'];
  updatedAt: Scalars['String']['output'];
};

export type Query = {
  __typename?: 'Query';
  fact?: Maybe<Fact>;
  search: Array<Fact>;
  topLevelFacts: Array<Fact>;
};


export type QueryFactArgs = {
  id: Scalars['ID']['input'];
};


export type QuerySearchArgs = {
  term: Scalars['String']['input'];
};

export type FactDetailsFragment = { __typename?: 'Fact', id: string, title: string, content: string, sourceURL?: string | null, children: Array<{ __typename?: 'Fact', id: string }> };

export type GetTopLevelFactsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetTopLevelFactsQuery = { __typename?: 'Query', topLevelFacts: Array<{ __typename?: 'Fact', id: string, title: string, content: string, sourceURL?: string | null, children: Array<{ __typename?: 'Fact', id: string }> }> };

export type SearchFactsQueryVariables = Exact<{
  term: Scalars['String']['input'];
}>;


export type SearchFactsQuery = { __typename?: 'Query', search: Array<{ __typename?: 'Fact', id: string, title: string, content: string, sourceURL?: string | null, children: Array<{ __typename?: 'Fact', id: string }> }> };

export type GetFactChildrenQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type GetFactChildrenQuery = { __typename?: 'Query', fact?: { __typename?: 'Fact', children: Array<{ __typename?: 'Fact', id: string, title: string, content: string, sourceURL?: string | null, children: Array<{ __typename?: 'Fact', id: string }> }> } | null };

export const FactDetailsFragmentDoc = gql`
    fragment FactDetails on Fact {
  id
  title
  content
  sourceURL
  children {
    id
  }
}
    `;
export const GetTopLevelFactsDocument = gql`
    query GetTopLevelFacts {
  topLevelFacts {
    ...FactDetails
  }
}
    ${FactDetailsFragmentDoc}`;

/**
 * __useGetTopLevelFactsQuery__
 *
 * To run a query within a React component, call `useGetTopLevelFactsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetTopLevelFactsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetTopLevelFactsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetTopLevelFactsQuery(baseOptions?: Apollo.QueryHookOptions<GetTopLevelFactsQuery, GetTopLevelFactsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetTopLevelFactsQuery, GetTopLevelFactsQueryVariables>(GetTopLevelFactsDocument, options);
      }
export function useGetTopLevelFactsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetTopLevelFactsQuery, GetTopLevelFactsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetTopLevelFactsQuery, GetTopLevelFactsQueryVariables>(GetTopLevelFactsDocument, options);
        }
export function useGetTopLevelFactsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetTopLevelFactsQuery, GetTopLevelFactsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetTopLevelFactsQuery, GetTopLevelFactsQueryVariables>(GetTopLevelFactsDocument, options);
        }
export type GetTopLevelFactsQueryHookResult = ReturnType<typeof useGetTopLevelFactsQuery>;
export type GetTopLevelFactsLazyQueryHookResult = ReturnType<typeof useGetTopLevelFactsLazyQuery>;
export type GetTopLevelFactsSuspenseQueryHookResult = ReturnType<typeof useGetTopLevelFactsSuspenseQuery>;
export type GetTopLevelFactsQueryResult = Apollo.QueryResult<GetTopLevelFactsQuery, GetTopLevelFactsQueryVariables>;
export const SearchFactsDocument = gql`
    query SearchFacts($term: String!) {
  search(term: $term) {
    ...FactDetails
  }
}
    ${FactDetailsFragmentDoc}`;

/**
 * __useSearchFactsQuery__
 *
 * To run a query within a React component, call `useSearchFactsQuery` and pass it any options that fit your needs.
 * When your component renders, `useSearchFactsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSearchFactsQuery({
 *   variables: {
 *      term: // value for 'term'
 *   },
 * });
 */
export function useSearchFactsQuery(baseOptions: Apollo.QueryHookOptions<SearchFactsQuery, SearchFactsQueryVariables> & ({ variables: SearchFactsQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SearchFactsQuery, SearchFactsQueryVariables>(SearchFactsDocument, options);
      }
export function useSearchFactsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SearchFactsQuery, SearchFactsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SearchFactsQuery, SearchFactsQueryVariables>(SearchFactsDocument, options);
        }
export function useSearchFactsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<SearchFactsQuery, SearchFactsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<SearchFactsQuery, SearchFactsQueryVariables>(SearchFactsDocument, options);
        }
export type SearchFactsQueryHookResult = ReturnType<typeof useSearchFactsQuery>;
export type SearchFactsLazyQueryHookResult = ReturnType<typeof useSearchFactsLazyQuery>;
export type SearchFactsSuspenseQueryHookResult = ReturnType<typeof useSearchFactsSuspenseQuery>;
export type SearchFactsQueryResult = Apollo.QueryResult<SearchFactsQuery, SearchFactsQueryVariables>;
export const GetFactChildrenDocument = gql`
    query GetFactChildren($id: ID!) {
  fact(id: $id) {
    children {
      ...FactDetails
    }
  }
}
    ${FactDetailsFragmentDoc}`;

/**
 * __useGetFactChildrenQuery__
 *
 * To run a query within a React component, call `useGetFactChildrenQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetFactChildrenQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetFactChildrenQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetFactChildrenQuery(baseOptions: Apollo.QueryHookOptions<GetFactChildrenQuery, GetFactChildrenQueryVariables> & ({ variables: GetFactChildrenQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetFactChildrenQuery, GetFactChildrenQueryVariables>(GetFactChildrenDocument, options);
      }
export function useGetFactChildrenLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetFactChildrenQuery, GetFactChildrenQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetFactChildrenQuery, GetFactChildrenQueryVariables>(GetFactChildrenDocument, options);
        }
export function useGetFactChildrenSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetFactChildrenQuery, GetFactChildrenQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetFactChildrenQuery, GetFactChildrenQueryVariables>(GetFactChildrenDocument, options);
        }
export type GetFactChildrenQueryHookResult = ReturnType<typeof useGetFactChildrenQuery>;
export type GetFactChildrenLazyQueryHookResult = ReturnType<typeof useGetFactChildrenLazyQuery>;
export type GetFactChildrenSuspenseQueryHookResult = ReturnType<typeof useGetFactChildrenSuspenseQuery>;
export type GetFactChildrenQueryResult = Apollo.QueryResult<GetFactChildrenQuery, GetFactChildrenQueryVariables>;