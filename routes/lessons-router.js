const { getLessons } = require("../controllers/lessons-controllers");

const lessonsRouter = require("express").Router();

lessonsRouter.route("/").get(getLessons);

module.exports = lessonsRouter;
