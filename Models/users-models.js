const client = require("../db/connection")

const db = client.db()

exports.findUsers = async ()=>{
    const users = await db.collection('users')
    const results = await users.find().toArray()
    return results
}