const client = require("../db/connection");

const db = client.db();

exports.findQuestionsById = async (question_id) => {
  const nonNumerical = /[^0-9]/
  if (nonNumerical.test(question_id) === true) {
    return Promise.reject({ status: 400, msg: "bad request" })
  }

  const questions = await db.collection("questions");
  const result = await questions.findOne({ _id: Number(question_id) });
  if (result === null) {
    return Promise.reject({ status: 404, msg: "id not found" });
  }
  return result;
};

exports.findQuestionsByLessonId = async (lesson_id) => {
  const nonNumerical = /[^0-9]/
  if (nonNumerical.test(lesson_id) === true) {
    return Promise.reject({ status: 400, msg: "bad request" })
  }
  const lessons = await db.collection("lessons");
  const lesson = await lessons.findOne({ _id: Number(lesson_id) });
  if (lesson === null) {
    return Promise.reject({ status: 404, msg: "id not found" });
  }
  const { questions } = lesson;
  return questions;
};
