# express-graphql-sample

Реализация простого `express` сервера с использованием GraphQL (предоставляемого библиотекой `express-graphql`), связанного с базой банных.

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

> Все в gql имеет тип с описанными типизированными свойствами. Запятые в gql необязательны.

```javascript
// ./api/schema.js for example

const { buildSchema } = require('graphql');

module.exports = buildSchema(`
  type Step {
    title: String!
    completed: Boolean!
  }

  // ...
`);
```

## Resolvers

> Каждая из функций должна вернуть тип в соответствии со схемой.

### `type Mutation`

> Как ни странно, используются для возможности изменения данных. Описывает названия функций-резолверорв (объявленных в `./resolvers.js`) с агрументами для изменений. В качестве типов принимаемых значений мы можем указывать только специальные типы входных данных вроде `type InputTodo` (в отличие от типов вроде `type Todo` они описаны отдельно, т.к. они не всегда сходятся один к одному), а так же описываются типы возвращаемых значений.

Для примера описаны 3 функции `createTodo`, `updateTodo`, `deleteTodo`.

При указании `input` нельзя указывать типы данных, которые мы определили ранее (напр, `type Todo`), вместо этого мы опишем еще один тип (напр. `type InputTodo`). Кстати, поля типов `input StepInput` могут получить значения по умолчанию.

## MongoDB

> Connected by `mongoose`. Модель описана в `./api/model.js`.
