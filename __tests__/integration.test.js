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
              expect(user).toHaveProperty("score", expect.any(Number));
              expect(user).toHaveProperty("password", expect.any(String));
              expect(user).toHaveProperty("avatar_url", expect.any(String));
              expect(user).toHaveProperty("friends", expect.any(Array));
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
              score: 0,
              friends: [],
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
            score: 0,
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
              score: expect.any(Number),
              password: "password",
              avatar_url:
                "https://images.pexels.com/photos/982047/pexels-photo-982047.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
              friends: ["G-eebs"],
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
    });

    describe("/api/users/:user_name/friends", () => {
      describe("PATCH", () => {
        test("PATCH: 200, adds a friend to the user object", () => {
          const testPatch = { friend: "thompsurn" };
          return request(app)
            .patch("/api/users/cogger101/friends")
            .send(testPatch)
            .expect(200)
            .then(({ body: { user } }) => {
              expect(user).toMatchObject({
                user_name: "cogger101",
                password: "password",
                avatar_url:
                  "https://images.pexels.com/photos/982047/pexels-photo-982047.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
                score: 50,
                friends: ["G-eebs", "thompsurn"],
              });
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
});
