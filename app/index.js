#!/usr/bin/env node
const { readFileSync, existsSync } = require('fs')
const { graphqlServer, gql } = require('./graphql')

const path = process.cwd() + '/'

const exists = path => existsSync(path)
const read = path => readFileSync(path, 'utf8')

const defaultValues = require('./default')

const typeDefsPath = path + 'schema.graphql'
const resolversPath = path + 'resolvers.js'
const mocksPath = path + 'mocks.js'

const typeDefsExists = exists(typeDefsPath)
const resolversExists = exists(resolversPath)
const mocksExists = exists(mocksPath)

if (typeDefsExists) {
  const typeDefs = read(typeDefsPath, 'utf8')
  const resolvers = resolversExists ? read(resolversPath, 'utf8') : {}
  const mocks = mocksExists ? read(mocksPath, 'utf8') : {}
  graphqlServer({ typeDefs, resolvers, mocks })
} else {
  console.log('schema.graphql not provided, running server with default value')
  graphqlServer(defaultValues)
}
