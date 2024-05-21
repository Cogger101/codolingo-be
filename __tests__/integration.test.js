const client = require(`${__dirname}/../db/connection.js`);
const seed = require("../db/seeds/seed.js");
const data = require("../db/data/test-data/index.js");
const app = require("../app.js");
const request = require("supertest");


beforeEach(() => seed(data));
afterAll(() => client.close());

const db = client.db();

describe("integration tests",()=>{
    describe("/api/users", ()=>{
        describe("GET", ()=>{
            test("GET:200 sends an array of all users",()=>{
                return request(app)
                .get('/api/users')
                .expect(200)
                .then(({body:{users}})=>{
                    expect(users.length).toBe(3)
                    users.forEach(user => {
                        console.log(user._id, '<---- int')
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
})