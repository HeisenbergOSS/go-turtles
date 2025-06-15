import fse from 'fs-extra';
import { buildSchema } from 'graphql';
import { GraphQLHandler} from 'graphql-mocks';
import { playwrightHandler } from '@graphql-mocks/network-playwright';
import path from 'path';
import { fileURLToPath } from 'url';

// This will now work correctly after installing @types/node
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const schemaString = fse.readFileSync(
  path.join(__dirname, '../../api/graph/schema.graphqls'),
  'utf8'
);
const schema = buildSchema(schemaString);

const mockFacts = {
  '1': { id: '1', title: 'MMR Vaccine is Highly Effective', content: 'Mock content for the MMR vaccine fact.', sourceURL: 'https://example.com/mmr', children: [{ id: '101' }] },
  '2': { id: '2', title: 'Another Top Level Fact', content: 'This is another fact for the homepage.', sourceURL: null, children: [] },
  '99': { id: '99', title: 'Vaccines Do Not Cause Autism', content: 'This is a mocked search result.', sourceURL: null, children: [] },
  '101': { id: '101', title: 'Child Fact Title', content: 'This is the child content.', sourceURL: null, children: [] }
};

// --- Define our Resolver Map with corrected types ---
const resolverMap = {
  Query: {
    topLevelFacts() {
      return [mockFacts['1'], mockFacts['2']];
    },
    
    // FIX: Replaced '_root: any' with '_root: unknown' for type safety
    search(_root: unknown, args: { term: string }) {
      if (args.term === 'autism') {
        return [mockFacts['99']];
      }
      return [];
    },

    // FIX: Replaced '_root: any' with '_root: unknown' for type safety
    fact(_root: unknown, args: { id: string }) {
      if (args.id === '1') {
        return { children: [mockFacts['101']] };
      }
      return null;
    }
  },
};

// FIX: Correctly pass the schema inside a 'dependencies' object
const handler = new GraphQLHandler({
  resolverMap: resolverMap,
  dependencies: {
    graphqlSchema: schema,
  },
});

export const mockedApi = playwrightHandler(handler);