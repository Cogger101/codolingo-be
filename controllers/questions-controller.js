const {
  findQuestionsById,
  findQuestionsByLessonId,
} = require("../Models/questions-models");

exports.getQuestionsById = (req, res, next) => {
  const { question_id } = req.params;
  findQuestionsById(question_id)
    .then((question) => {
      res.status(200).send({ question });
    })
    .catch(next);
};

exports.getQuestionsByLessonId = (req, res, next) => {
  const { lesson_id } = req.params;
  findQuestionsByLessonId(lesson_id)
    .then((questionIds) => {
      return Promise.all(questionIds.map((questionId) => {
        return findQuestionsById(questionId)
      }))
        .then((questions) => {
          res.status(200).send({ questions })
        })
    })
    .catch(next);
};