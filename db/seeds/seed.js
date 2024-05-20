const client = require(`${__dirname}/../connection`);

const db = client.db()

const seed = async ({ lessonData, userData, questionData }) => {
  await db.collection("lessons").drop()
  await db.collection("lessons").insertMany(lessonData)
}

module.exports = seed