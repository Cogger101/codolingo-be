const client = require(`${__dirname}/../db/connection.js`);
const seed = require("../db/seeds/seed.js");
const data = require("../db/data/test-data/index.js");

beforeEach(() => seed(data));
afterAll(() => client.close());

const db = client.db();

describe("seed()", () => {
  describe("lessons collection", () => {
    test("Lessons collection data is inserted correctly", () => {
      return db
        .collection("lessons")
        .find()
        .toArray()
        .then((result) => {
          expect(result.length).toBe(2);
          result.forEach((lesson) => {
            expect(lesson).toHaveProperty("_id", expect.any(Number));
            expect(lesson).toHaveProperty("questions", expect.any(Array));
          });
        });
    });
  });

  describe("users collection", () => {
    test("Users collection data is inserted correctly", () => {
      return db
        .collection("users")
        .find()
        .toArray()
        .then((result) => {
          expect(result.length).toBe(3);
          result.forEach((user) => {
            expect(user).toHaveProperty("_id", expect.any(Object));
            expect(user).toHaveProperty("user_name", expect.any(String));
            expect(user).toHaveProperty("password", expect.any(String));
            expect(user).toHaveProperty("avatar_url", expect.any(String));
            expect(user).toHaveProperty("following", expect.any(Array));
            expect(user).toHaveProperty("progress", expect.any(Array));
          });
        });
    });
  });

  describe("questions collection", () => {
    test("Questions collection data is inserted correctly", () => {
      return db
        .collection("questions")
        .find()
        .toArray()
        .then((result) => {
          expect(result.length).toBe(8);
          result.forEach((question) => {
            expect(question).toHaveProperty("_id", expect.any(Number));
            expect(question).toHaveProperty("type", expect.any(String));
            expect(question).toHaveProperty("teaching", expect.any(String));
            expect(question).toHaveProperty("question", expect.any(String));
            expect(question).toHaveProperty("answer");
            expect(question).toHaveProperty("help_url", expect.any(String));
          });
        });
    });
  });
});
