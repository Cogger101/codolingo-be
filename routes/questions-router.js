const { getQuestionsById } = require("../controllers/questions-controller");

const questionsRouter = require("express").Router();

questionsRouter.route("/:question_id").get(getQuestionsById);

module.exports = questionsRouter;
