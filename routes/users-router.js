const {
  getUsers,
  getUserByName,
  postUser,
} = require("../controllers/users-controllers");

const usersRouter = require("express").Router();

usersRouter.route("/").get(getUsers).post(postUser);

usersRouter.route("/:user_name").get(getUserByName);

module.exports = usersRouter;
