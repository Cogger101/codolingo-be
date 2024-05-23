const client = require("../db/connection");

const db = client.db();

exports.findQuestionsById = async (question_id) => {
  const questions = await db.collection("questions");
  const result = await questions.findOne({ _id: Number(question_id) });
  return result;
};

exports.findQuestionsByLessonId = async (lesson_id) => {
  const lessons = await db.collection("lessons");
  const lesson = await lessons.findOne({ _id: Number(lesson_id) });
  const { questions } = lesson;
  return questions;
};
