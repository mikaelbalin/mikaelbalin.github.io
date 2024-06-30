import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  overwrite: true,
  schema: "http://localhost:1337/graphql",
  documents: "src/**/*.ts",
  generates: {
    "src/gql/file.ts": {
      plugins: [
        "typescript",
        "typescript-operations",
        "typescript-graphql-request",
      ],
      config: {
        rawRequest: true,
        gqlImport: "graphql-request#gql",
        documentMode: "documentNode",
      },
    },
  },
};

export default config;
