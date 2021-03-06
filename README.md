# express-graphql-sample

Реализация простого `express` сервера с использованием GraphQL (предоставляемого библиотекой `express-graphql`), связанного с базой банных MongoDB.

## API module

> За API будет отвечать отдельное `express` приложение (Смотри директорию `./api`).

Рантайм GraphQL будет связан с `express` сервером библиотекой `express-graphql`. Промежуточный обработчик `qraphqlMiddleware` будет отвечать за обработку запросов и отдачу ответов по маршруту `/api/graphql`.

```javascript
// ./api/index.js

api.all('/graphql', qraphqlMiddleware({
  schema, // See below
  rootValue: resolvers,
  graphiql: true
}));
```

## Schema

> Файл `api/schema.js` создан чтоб не захламлять файл `api/index.js`. В `type Query` необходимо прописать тип запросов, которые необходимо принимать (напр. `todos`), в значениях полей после двоеточия нужно указать тип возвращаемых значений.

## GraphiQL

> Если `graphiql: true`, то по маршруту `/api/graphql` в браузере будет сгенерирован редактор `GraphiQL`. В `Docs` описаны корневые типы, определенные в `api/schema.js`.

## Types

> Все в gql имеет тип с описанными типизированными свойствами. Запятые в gql необязательны. See also [https://graphql.org/graphql-js/basic-types/](https://graphql.org/graphql-js/basic-types/).

```javascript
// ./api/schema.js for example

const { buildSchema } = require('graphql');

module.exports = buildSchema(`
  type Step {
    title: String!
    completed: Boolean!
  }

  # Others...
`);
```

## Resolvers

> Каждая из функций должна вернуть тип в соответствии со схемой.

## `type Mutation`

> Как ни странно, используются для возможности изменения данных. Описывает названия функций-резолверорв (объявленных в `./resolvers.js`) с агрументами для изменений. В качестве типов принимаемых значений мы можем указывать только специальные типы входных данных вроде `type InputTodo` (в отличие от типов вроде `type Todo` они описаны отдельно, т.к. они не всегда сходятся один к одному), а так же описываются типы возвращаемых значений.

Для примера описаны 3 функции `createTodo`, `updateTodo`, `deleteTodo`.

При указании `input` нельзя указывать типы данных, которые мы определили ранее (напр, `type Todo`), вместо этого мы опишем еще один тип (напр. `type InputTodo`). Кстати, поля типов `input StepInput` могут получить значения по умолчанию.

## MongoDB

> Connected by `mongoose`. Модель описана в `./api/model.js`.

_Note: `.env` file should be created for have this:_
```
MONGOLAB_URI="mongodb://<user>:<passwd>@<host>:<port>/express-graphql-sample"
```

## About `./api/scheme.gql` file

> В папке `./api` создадим файл `schema.gql` и перенесем схему туда.

```graphql
# ./api/schema.gql

type Step {
  title: String!
  completed: Boolean!
}

# Others...
```

_So we have to update `./api/schema.js` like this:_

```javascript
// ./api/schema.js

const path = require('path');
const fs = require('fs');

const { buildSchema } = require('qraphql');
const schema = fs.readFieSync(path.resolve(__dirname, 'schema.gql'), 'utf-8');

module.exports = buildSchema(schema);
```
