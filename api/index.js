const express = require('express');
const qraphqlMiddleware = require('express-graphql'); // Note: GraphQL middleware options must contain a schema.
const api = express();
const mongoose = require('mongoose');
const schema = require('./schema');
const resolvers = require('./resolvers');
const dotenv = require('dotenv');

dotenv.config();

var mongoLabURI = process.env.MONGOLAB_URI;

mongoose.Promise = Promise;
mongoose.connect(mongoLabURI);
mongoose.connection.once('open', () => console.log('Connected to MongoDB'));

api.all('/graphql', qraphqlMiddleware({
  schema,
  rootValue: resolvers,
  graphiql: true
}));

module.exports = api;
