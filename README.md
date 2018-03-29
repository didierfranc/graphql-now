# graphql-now

## start a mock server

```sh
$ graphql-now
```

**schema.graphql**

```graphql
{
  hello: String
}
```

**mocks.js**

```js
const faker = require('faker')

module.exports = {
  String: () => faker.random.word(),
}
```

## deploy it

```sh
$ graphql-now deploy
```
