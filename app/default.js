const { gql } = require('./graphql')

module.exports = {
  typeDefs: gql`
    type Query {
      hello: String
    }
  `,
  resolvers: {},
  mocks: {},
}
