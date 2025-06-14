import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  schema: "../api/graph/schema.graphqls",
  documents: "src/graphql/**/*.graphql",
  generates: {
    // We will generate a single file with all our types and hooks
    "./src/graphql/generated.ts": {
      plugins: [
        "typescript",
        "typescript-operations",
        "typescript-react-apollo",
      ],
      config: {
        // This makes the generated code fully compatible with modern React
        withHooks: true,
        exposeQueryKeys: true,
        fetcher: "graphql-request",
      },
    },
  },
};

export default config;
