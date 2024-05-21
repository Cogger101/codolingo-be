const client = require(`${__dirname}/../connection`);

const db = client.db()

const seed = async ({ lessonData, userData, questionData }) => {
  await db.collection("lessons").drop()
  await db.collection("lessons").insertMany(lessonData)
  await db.collection("users").drop()
  await db.collection("users").createIndex({"user_name": 1}, {unique: true})
  await db.collection("users").insertMany(userData)
  await db.collection("questions").drop()
  await db.collection("questions").insertMany(questionData)
}

module.exports = seed