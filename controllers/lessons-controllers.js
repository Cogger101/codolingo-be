const { findLessons } = require("../Models/lessons-models");

exports.getLessons = (req, res, next) => {
  findLessons()
    .then((lessons) => {
      res.status(200).send({ lessons });
    })
    .catch(next);
};
