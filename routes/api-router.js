const apiRouter = require("express").Router();

const { getEndpoints } = require("../controllers/api-controller");
const lessonsRouter = require("./lessons-router");
const questionsRouter = require("./questions-router");
const usersRouter = require("./users-router");

apiRouter.get("/", getEndpoints);

apiRouter.use("/lessons", lessonsRouter);

apiRouter.use("/users", usersRouter);

apiRouter.use("/questions", questionsRouter);

module.exports = apiRouter;
