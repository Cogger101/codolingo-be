const client = require(`${__dirname}/../db/connection.js`);
const seed = require("../db/seeds/seed.js");
const data = require("../db/data/test-data/index.js");
const app = require("../app.js");
const request = require("supertest");
const users = require("../db/data/development-data/users.js");


beforeEach(() => seed(data));
afterAll(() => client.close());

const db = client.db();

describe("integration tests",()=>{
    describe("invalid endpoint",()=>{
        test("should return error msg of 'Endpoint Not Found'",()=>{
            return request(app)
            .get('/nothere')
            .expect(404)
            .then(({body:{msg}})=>{
                expect(msg).toBe('Endpoint Not Found')
            })
        })
    })
    describe("/api/users", ()=>{
        describe("GET", ()=>{
            test("GET:200 sends an array of all users",()=>{
                return request(app)
                .get('/api/users')
                .expect(200)
                .then(({body:{users}})=>{
                    expect(users.length).toBe(3)
                    users.forEach(user => {
                        expect(user).toHaveProperty("_id", expect.any(String));
                        expect(user).toHaveProperty("user_name", expect.any(String))
                        expect(user).toHaveProperty("score", expect.any(Number));
                        expect(user).toHaveProperty("password", expect.any(String))
                        expect(user).toHaveProperty("avatar_url", expect.any(String));
                        expect(user).toHaveProperty("friends", expect.any(Array))
                        expect(user).toHaveProperty("progress", expect.any(Array))
                      });
                })                
            })
        })
    })
    describe("/api/users/:user_name",()=>{
        describe("GET",()=>{
            test("GET:200 sends user with a specific user_name",()=>{
                return request(app)
                .get('/api/users/cogger101')
                .expect(200)
                .then(({body:{user}})=>{
                    expect(user).toMatchObject({
                        user_name: "cogger101",
                        score: expect.any(Number),
                        password: "password",
                        avatar_url: "https://images.pexels.com/photos/982047/pexels-photo-982047.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
                        friends: ["G-eebs"],
                        progress: [1, 2, 3, 4, 5],
                      },)
                })
            })
            test("GET:404 sends an appropriate status and error message when given a non existent username", ()=>{
                return request(app)
                .get('/api/users/cogger102')
                .expect(404)
                .then(({body: {msg}})=>{
                    expect(msg).toBe('user not found')
                })
            })
        })
    })
})