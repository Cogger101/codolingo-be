const client = require("../db/connection");

const db = client.db();

exports.findLessons = async () => {
  const lessons = await db.collection("lessons");
  const result = await lessons.find().toArray();
  return result;
};
