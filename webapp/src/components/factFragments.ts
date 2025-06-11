// webapp/src/components/factFragments.ts

import { gql } from "../gql";

// Level 5 (Base case): The deepest level we fetch. It has no children.
const FACT_DETAILS_L5 = gql(`
  fragment FactDetailsL5 on Fact {
    id
    title
    content
    sourceURL
  }
`);

// Level 4: Includes Level 5 fragments for its children.
const FACT_DETAILS_L4 = gql(`
  fragment FactDetailsL4 on Fact {
    ...FactDetailsL5
    children {
      ...FactDetailsL5
    }
  }
`);

// Level 3: Includes Level 4 fragments for its children.
const FACT_DETAILS_L3 = gql(`
  fragment FactDetailsL3 on Fact {
    ...FactDetailsL4
    children {
      ...FactDetailsL4
    }
  }
`);

// Level 2: Includes Level 3 fragments.
const FACT_DETAILS_L2 = gql(`
  fragment FactDetailsL2 on Fact {
    ...FactDetailsL3
    children {
      ...FactDetailsL3
    }
  }
`);

// Level 1 (Top Level): This is the fragment we'll use for our main component.
export const FACT_DETAILS_FRAGMENT = gql(`
  fragment FactDetails on Fact {
    ...FactDetailsL2
    children {
      ...FactDetailsL2
    }
  }
`);
