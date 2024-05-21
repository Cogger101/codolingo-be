const { getUsers, getUserByName } = require("../controllers/users-controllers");

const usersRouter = require("express").Router();

usersRouter.route('/').get(getUsers)

usersRouter.route('/:user_name').get(getUserByName)

module.exports = usersRouter;