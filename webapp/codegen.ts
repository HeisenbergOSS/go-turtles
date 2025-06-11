import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  schema: "../api/graph/schema.graphqls",
  // Update this line to include .graphql files
  documents: ["src/**/*.tsx", "src/graphql/**/*.graphql"],
  ignoreNoDocuments: true,
  generates: {
    "./src/gql/": {
      preset: "client",
      plugins: [],
    },
  },
};

export default config;
