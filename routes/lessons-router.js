const {
  getLessons,
  getLessonById,
} = require("../controllers/lessons-controllers");
const { getQuestionsByLessonId } = require("../controllers/questions-controller");

const lessonsRouter = require("express").Router();

lessonsRouter.route("/").get(getLessons);
lessonsRouter.route("/:lesson_id").get(getLessonById);
lessonsRouter.route("/:lesson_id/questions").get(getQuestionsByLessonId);

module.exports = lessonsRouter;
