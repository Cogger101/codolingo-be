const express = require("express");
const apiRouter = require("./routes/api-router");
const { handleCustomErrors, handleInvalidEndpoint, handleServerErrors } = require("./error-handling");
const cors = require('cors');

const app = express();

app.use(cors());

app.use(express.json());

app.use('/api', apiRouter);

app.use(handleInvalidEndpoint)

app.use(handleCustomErrors)

app.use(handleServerErrors)

module.exports = app;