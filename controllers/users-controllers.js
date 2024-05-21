const {findUsers, findUserByName} = require("../Models/users-models")

exports.getUsers = (req, res, next)=>{
    findUsers().then((users)=>{
        res.status(200).send({users})
    })
}

exports.getUserByName = (req, res, next)=>{
    const {user_name} = req.params
    findUserByName(user_name).then((user)=>{
        res.status(200).send({user})
    })
    .catch(next)
}