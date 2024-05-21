const {findUsers} = require("../Models/users-models")

exports.getUsers = (req, res, next)=>{
    findUsers().then((users)=>{
        res.status(200).send({users})
    })
}