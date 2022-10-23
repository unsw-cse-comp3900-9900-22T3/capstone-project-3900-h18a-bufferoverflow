
import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  overwrite: true,
  schema: `http://localhost:${process.env.NEXT_PUBLIC_BACKEND_PORT}/graphql`,
  documents: "./**/*.tsx",
  generates: {
    "gql/": {
      preset: "client",
      plugins: []
    },
  }
};

export default config;
