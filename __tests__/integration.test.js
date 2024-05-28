const client = require(`${__dirname}/../db/connection.js`);
const seed = require("../db/seeds/seed.js");
const data = require("../db/data/test-data/index.js");
const app = require("../app.js");
const request = require("supertest");
const users = require("../db/data/development-data/users.js");
const endpointsFile = require("../endpoints.json");

beforeEach(() => seed(data));
afterAll(() => client.close());

const db = client.db();

describe("integration tests", () => {
  describe("invalid endpoint", () => {
    test("should return error msg of 'Endpoint Not Found'", () => {
      return request(app)
        .get("/nothere")
        .expect(404)
        .then(({ body: { msg } }) => {
          expect(msg).toBe("Endpoint Not Found");
        });
    });
  });

  describe("/api", () => {
    describe("GET", () => {
      test("GET: 200, sends an object with details on all available endpoints", () => {
        return request(app)
          .get("/api")
          .expect(200)
          .then(({ body: { endpoints } }) => {
            expect(endpoints).toEqual(endpointsFile);
          });
      });
    });
  });

  describe("/api/users", () => {
    describe("GET", () => {
      test("GET:200 sends an array of all users", () => {
        return request(app)
          .get("/api/users")
          .expect(200)
          .then(({ body: { users } }) => {
            expect(users.length).toBe(3);
            users.forEach((user) => {
              expect(user).toHaveProperty("_id", expect.any(String));
              expect(user).toHaveProperty("user_name", expect.any(String));
              expect(user).toHaveProperty("password", expect.any(String));
              expect(user).toHaveProperty("avatar_url", expect.any(String));
              expect(user).toHaveProperty("following", expect.any(Array));
              expect(user).toHaveProperty("progress", expect.any(Array));
            });
          });
      });
    });
    describe("POST", () => {
      test("POST: 201 successfully adds a user", () => {
        return request(app)
          .post("/api/users")
          .send({
            user_name: "octopus",
            password: "password",
            avatar_url:
              "https://images.pexels.com/photos/1056251/pexels-photo-1056251.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
          })
          .expect(201)
          .then(({ body: { postedUser } }) => {
            expect(postedUser).toMatchObject({
              user_name: "octopus",
              password: "password",
              avatar_url:
                "https://images.pexels.com/photos/1056251/pexels-photo-1056251.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
              following: [],
              progress: [],
            });
          });
      });

      test("POST: 400, sends an appropriate status and error message when given a malformed user object", () => {
        return request(app)
          .post("/api/users")
          .send({
            user_name: 1342,
            password: "password",
            avatar:
              "https://images.pexels.com/photos/1056251/pexels-photo-1056251.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
          })
          .expect(400)
          .then(({ body: { msg } }) => {
            expect(msg).toBe("invalid request");
          });
      });
    });
  });

  describe("/api/users/:user_name", () => {
    describe("GET", () => {
      test("GET:200 sends user with a specific user_name", () => {
        return request(app)
          .get("/api/users/cogger101")
          .expect(200)
          .then(({ body: { user } }) => {
            expect(user).toMatchObject({
              user_name: "cogger101",
              password: "password",
              avatar_url:
                "https://images.pexels.com/photos/982047/pexels-photo-982047.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
              following: ["G-eebs"],
              progress: [1, 2, 3, 4, 5],
            });
          });
      });
      test("GET:404 sends an appropriate status and error message when given a non existent username", () => {
        return request(app)
          .get("/api/users/cogger102")
          .expect(404)
          .then(({ body: { msg } }) => {
            expect(msg).toBe("user not found");
          });
      });
      describe("/api/users/:user_name/progress", () => {
        describe("PATCH", () => {
          test("PATCH:200, updates the users progression with a question id, when that question has been completed", () => {
            const testPatch = { progress: 1}
            return request(app)
            .patch("/api/users/thompsurn/progress")
            .send(testPatch)
            .expect(200)
            .then(({body: {user}}) => {
              expect(user).toMatchObject({
                user_name: "thompsurn",
                password: "password",
                avatar_url: "https://images.pexels.com/photos/987584/pexels-photo-987584.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
                following: [],
                progress: [1],
              })
            })
          })
        })
        test("PATCH:404 sends an appropriate status and error message when given a non existent username", () => {
          const testPatch = { progress: 1}
          return request(app)
            .patch("/api/users/not-a-valid-user/progress")
            .send(testPatch)
            .expect(404)
            .then(({ body: { msg } }) => {
              expect(msg).toBe("user not found");
            });
        });
      })
    });

    describe("/api/users/:user_name/following", () => {
      describe("PATCH", () => {
        test("PATCH: 200, adds a username to the 'following' property on the user object, when a new follow request is made", () => {
          const testPatch = { following: "thompsurn" };
          return request(app)
            .patch("/api/users/cogger101/following")
            .send(testPatch)
            .expect(200)
            .then(({ body: { user } }) => {
              expect(user).toMatchObject({
                user_name: "cogger101",
                password: "password",
                avatar_url:
                  "https://images.pexels.com/photos/982047/pexels-photo-982047.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
                following: ["G-eebs", "thompsurn"],
              });
            });
        });
        test("PATCH:404 sends an appropriate status and error message when given a non existent username", () => {
          const testPatch = { following: "thompsurn" };
          return request(app)
            .patch("/api/users/not-a-valid-user/following")
            .send(testPatch)
            .expect(404)
            .then(({ body: { msg } }) => {
              expect(msg).toBe("user not found");
            });
        });
      });

      describe("/api/lessons", () => {
        describe("GET", () => {
          test("GET: 200, sends an array of all lessons", () => {
            return request(app)
              .get("/api/lessons")
              .expect(200)
              .then(({ body: { lessons } }) => {
                expect(lessons.length).toBe(2);
                lessons.forEach((lesson) => {
                  expect(lesson).toHaveProperty("_id", expect.any(Number));
                  expect(lesson).toHaveProperty("questions", expect.any(Array));
                });
              });
          });
        });

        describe("/api/lessons/:lesson_id", () => {
          describe("GET", () => {
            test("GET: 200, sends a lessons with a specified lesson_id", () => {
              return request(app)
                .get("/api/lessons/1")
                .expect(200)
                .then(({ body: { lesson } }) => {
                  expect(lesson).toMatchObject({
                    _id: 1,
                    questions: [1, 2, 3, 4],
                  });
                });
            });
          });
        });

        test("GET:404 sends an appropriate status and error message when given a non existent lesson_id", () => {
          return request(app)
            .get("/api/lessons/4536822920")
            .expect(404)
            .then(({ body: { msg } }) => {
              expect(msg).toBe("lesson not found");
            });
        });

        test("GET:400 sends an appropriate status and error message when given a non-valid lesson_id", () => {
          return request(app)
            .get("/api/lessons/osnkd")
            .expect(400)
            .then(({ body: { msg } }) => {
              expect(msg).toBe("bad request");
            });
        });
      });
    });
  });
  describe("/api/lessons/:lesson_id/questions", () => {
    describe("GET", () => {
      test("GET 200: should return a series of questions for the specified id", () => {
        return request(app)
          .get("/api/lessons/1/questions")
          .expect(200)
          .then(({ body: { questions } }) => {
            expect(questions).toMatchObject(
              [{
                _id: 1,
                type: "multiple choice",
                teaching:
                  "A variable is like a box that holds data that you can use and manipulate in your program. Think of it as a labelled bag where you can store different types of information.",
                question: "What is a variable?",
                options: [
                  "a container to store data",
                  "an ordered list",
                  "an unordered list",
                  "a set of items",
                ],
                answer: 0,
                help_url:
                  "https://www.w3schools.com/python/python_variables.asp",
              },
              {
                _id: 2,
                type: "multiple choice",
                teaching:
                  "In Python, assigning a value to a variable is straightforward. You use the equals sign (=) to do this.",
                question: "How would you assign a value to a variable?",
                options: ["let a = 7", "var a = 7", "a = 7", "const a = 7"],
                answer: 2,
                help_url:
                  "https://www.w3schools.com/python/python_variables.asp",
              },
              {
                _id: 3,
                type: "multiple choice",
                teaching:
                  "Tuple assignment allows for the assignment of multiple values to multiple variables. Example: a, b = 1, 2 assigns 1 to a and 2 to b.",
                question:
                  "Multiples values can be assigned to multiple variables at once.",
                options: ["true", "false"],
                answer: 0,
                help_url:
                  "https://www.w3schools.com/python/python_variables.asp",
              },
              {
                _id: 4,
                type: "drag and drop",
                teaching: `In Python, comparison operators allow you to compare values and determine relationships between them. Let's break down each operator:\n== This operator checks if two values are equal. For example, 5 == 5 returns True.\n! The exclamation mark (!) stands for "not" in Python. It's used in combination with = to form the != operator, which checks if two values are not equal. For instance, 5 != 3 returns True.\n> This operator checks if the value on the left is greater than the value on the right. For example, 7 > 5 returns True.\n< This operator checks if the value on the left is less than the value on the right. For instance, 3 < 5 returns True.`,
                question: "Drag the following to the correct definition:",
                options: ["<=", "!=", "<", "==", ">=", ">"],
                answer_options: [
                  "is equal to",
                  "not equal to",
                  "greater than",
                  "less than",
                  "greater than or equal to",
                  "less than or equal to",
                ],
                answer: ["==", "!=", ">", "<", ">=", "<="],
                help_url:
                  "https://www.w3schools.com/python/python_operators.asp",
              }]
            );
          });
        });
        test("GET:404 sends an appropriate status and error message when given a non existent lesson id", () => {
          return request(app)
            .get("/api/lessons/999/questions")
            .expect(404)
            .then(({ body: { msg } }) => {
              expect(msg).toBe("id not found");
            });
        });
        test("GET:400 sends an appropriate status and error message when given a non-valid lesson id", () => {
          return request(app)
            .get("/api/lessons/not-an-id/questions")
            .expect(400)
            .then(({ body: { msg } }) => {
              expect(msg).toBe("bad request");
            });
        });

    });
  });

  describe("/api/questions/:question_id", () => {
    describe("GET", () => {
      test("GET: 200, responds with a particular question for the specified id", () => {
        return request(app)
          .get("/api/questions/1")
          .expect(200)
          .then(({ body: { question } }) => {
            expect(question).toMatchObject({
              _id: 1,
              type: "multiple choice",
              teaching:
                "A variable is like a box that holds data that you can use and manipulate in your program. Think of it as a labelled bag where you can store different types of information.",
              question: "What is a variable?",
              options: [
                "a container to store data",
                "an ordered list",
                "an unordered list",
                "a set of items",
              ],
              answer: 0,
              help_url:
                "https://www.w3schools.com/python/python_variables.asp",
            });
          });
      });
      test("GET:404 sends an appropriate status and error message when given a non existent question id", () => {
        return request(app)
          .get("/api/questions/999")
          .expect(404)
          .then(({ body: { msg } }) => {
            expect(msg).toBe("id not found");
          });
      });
      test("GET:400 sends an appropriate status and error message when given a non-valid question id", () => {
        return request(app)
          .get("/api/questions/not-an-id")
          .expect(400)
          .then(({ body: { msg } }) => {
            expect(msg).toBe("bad request");
          });
      });
    });
  });
});

