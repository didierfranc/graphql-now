const { createServer } = require('http')

const getRawBody = require('raw-body')
const cors = require('./cors')

const { graphql } = require('graphql')
const {
  makeExecutableSchema,
  addMockFunctionsToSchema,
  addResolveFunctionsToSchema,
} = require('graphql-tools')

const init = schema => async (req, res) => {
  if (req.method === 'GET') {
    res.setHeader('Content-Type', 'text/plain; charset=utf-8')
    res.end('🤖')
  }
  const { query, variables } = JSON.parse(await getRawBody(req))
  if (query) {
    const result = await graphql(schema, query, null, null, variables)
    res.end(JSON.stringify(result))
  } else {
    res.end('Specify a query')
  }
}

const graphqlServer = ({ resolvers, typeDefs, mocks }) => {
  const schema = makeExecutableSchema({ typeDefs })

  addMockFunctionsToSchema({ schema, mocks, preserveResolvers: true })
  addResolveFunctionsToSchema({ schema, resolvers })

  createServer(cors(init(schema))).listen(9999)
}

module.exports = {
  graphqlServer,
  gql: String.raw,
}
