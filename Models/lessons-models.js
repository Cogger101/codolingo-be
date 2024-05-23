const client = require("../db/connection");

const db = client.db();

exports.findLessons = async () => {
  const lessons = await db.collection("lessons");
  const result = await lessons.find().toArray();
  return result;
};

exports.findLessonById = async (id) => {
  const nonNumerical = /[^0-9]/
  if (nonNumerical.test(id) === true){
    return Promise.reject({status: 400, msg: "bad request"})
  }
  
  const lessons = await db.collection("lessons");
  const result = await lessons.findOne({ _id: +id });

  if (result === null) {
    return Promise.reject({ status: 404, msg: "lesson not found" });
  }
  return result;
};

