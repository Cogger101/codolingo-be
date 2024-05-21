const client = require("../db/connection")

const db = client.db()

exports.findUsers = async ()=>{
    const users = await db.collection('users')
    const result = await users.find().toArray()
    return result
}

exports.findUserByName = async (userName)=>{
    const users = await db.collection('users')
    const result = await users.findOne({user_name: userName})
    if (result === null){
        return Promise.reject({status:404, msg :'user not found'})
    }
    return result
}

