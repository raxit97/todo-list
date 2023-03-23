require('dotenv').config();

const { ApolloServer } = require('apollo-server');

// Schemas
const launchTypeDefs = require('./schema/launch-schema');
const enumDefs = require('./schema/enum-defs');

// Resolvers
const queryResolvers = require('./resolvers/query-resolver');

// Data Stores
const LaunchAPI = require('./datasources/launch');
const UserAPI = require('./datasources/user');

const { createStore } = require('./utils');
const TodoListAPI = require('./datasources/todo-list');

const server = new ApolloServer({
  typeDefs: [launchTypeDefs, enumDefs],
  resolvers: [queryResolvers],
  dataSources: () => ({
    // launchAPI: new LaunchAPI(),
    // userAPI: new UserAPI({ store: createStore() }),
    todoListAPI: new TodoListAPI()
  })
});

server.listen().then(() => {
    console.log(`
      Server is running! Listening on port 4000
      Explore at https://studio.apollographql.com/dev
    `);
});
