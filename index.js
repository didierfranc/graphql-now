#!/usr/bin/env node

const { readFileSync, existsSync } = require('fs')
const chalk = require('chalk')
const graphql = require('./graphql')

process.stdout.write('\033c')
process.stdout.write(
  String.fromCharCode(27) + ']0;' + 'graphql-now' + String.fromCharCode(7),
)

console.log(chalk.white('graphql-now ...\n'))

const schemaFile = process.cwd() + '/schema.graphql'
const mocksFile = process.cwd() + '/mocks.js'

const schemaFileExist = existsSync(schemaFile)
const mocksFileExist = existsSync(mocksFile)

if (schemaFileExist) {
  const typeFile = readFileSync(schemaFile, 'utf8')
  console.log(chalk.green('schema.graphql loaded'))

  if (mocksFileExist) {
    console.log(chalk.green('mocks.js loaded'))
    graphql(schemaFile, mocksFile)
  } else {
    console.log(chalk.yellow('mocks.js not found'))
    graphql(schemaFile)
  }
} else {
  console.log(chalk.red('schema.graphql not found'))
}
