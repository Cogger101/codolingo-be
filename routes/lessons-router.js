const {
  getLessons,
  getLessonById,
} = require("../controllers/lessons-controllers");

const lessonsRouter = require("express").Router();

lessonsRouter.route("/").get(getLessons);
lessonsRouter.route("/:lesson_id").get(getLessonById);

module.exports = lessonsRouter;
