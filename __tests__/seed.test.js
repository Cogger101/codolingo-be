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
			    console.log(result);
			    result.forEach(lesson => {
			      expect(lesson).toHaveProperty("_id", expect.any(Number));
			      expect(lesson).toHaveProperty("questions", expect.any(Array))
			      expect(lesson.questions).toHaveLength(4)
			    });
				});
		});
	});
});
