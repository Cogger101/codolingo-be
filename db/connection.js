const { MongoClient } = require("mongodb");

const ENV = process.env.NODE_ENV || 'development';

require('dotenv').config({
  path: `${__dirname}/../.env.${ENV}`,
});

const uri = process.env.MONGO_URI

module.exports = new MongoClient(uri);