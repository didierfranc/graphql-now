const { createServer } = require('http')
const { readFileSync, existsSync } = require('fs')
const getRawBody = require('raw-body')
const { graphql } = require('graphql')
const {
  makeExecutableSchema,
  addMockFunctionsToSchema,
} = require('graphql-tools')
const chalk = require('chalk')

const cors = next => (req, res) => {
  res.setHeader('Access-Control-Allow-Headers', '*')
  res.setHeader('Access-Control-Allow-Origin', '*')
  if (req.method === 'OPTIONS') res.end()
  else next(req, res)
}

module.exports = (schemaPath, mocksPath) => {
  const typeDefs = readFileSync(schemaPath, 'utf8')
  const schema = makeExecutableSchema({ typeDefs })

  let mocks

  if (existsSync(mocksPath)) {
    const mocksFile = readFileSync(mocksPath, 'utf8')
    eval(mocksFile.replace('module.exports', 'mocks'))
  }

  addMockFunctionsToSchema({ schema, mocks })

  const app = cors(async (req, res) => {
    if (req.method === 'GET') {
      res.setHeader('Content-Type', 'text/plain; charset=utf-8')
      return res.end('🤖')
    }
    const { query, variables } = JSON.parse(await getRawBody(req))
    if (query) {
      const result = await graphql(schema, query, null, null, variables)
      return res.end(JSON.stringify(result))
    } else {
      return res.end('Specify a query')
    }
  })

  const port = 9999

  createServer(app).listen(port, () =>
    console.log('\n' + chalk.inverse('http://localhost:' + port)),
  )
}
