const apiRouter = require("express").Router();

const lessonsRouter = require('./lessons-router')
const questionsRouter = require('./questions-router')
const usersRouter = require('./users-router')

apiRouter.use("/lessons", lessonsRouter)

apiRouter.use("/users", usersRouter)

apiRouter.use("/questions", questionsRouter)

module.exports = apiRouter;