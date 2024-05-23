const { findLessons, findLessonById } = require("../Models/lessons-models");

exports.getLessons = (req, res, next) => {
  findLessons()
    .then((lessons) => {
      res.status(200).send({ lessons });
    })
    .catch(next);
};

exports.getLessonById = (req, res, next) => {
  const { lesson_id } = req.params;
  findLessonById(lesson_id)
    .then((lesson) => {
      res.status(200).send({ lesson });
    })
    .catch(next);
};

