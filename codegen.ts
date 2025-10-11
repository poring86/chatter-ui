import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  overwrite: true,
  schema: 'http://localhost:3333/graphql',
  documents: 'src/**/*.{ts,tsx}',
  generates: {
    'src/gql/': {
      preset: 'client',
      presetConfig: {
        gqlTagName: 'graphql',
        documentMode: 'string',
        fragmentMasking: false,
      },
    },
  },
};

export default config;
