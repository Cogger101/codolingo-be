const {
  getUsers,
  getUserByName,
  postUser,
  patchFriends,
} = require("../controllers/users-controllers");

const usersRouter = require("express").Router();

usersRouter.route("/").get(getUsers).post(postUser);

usersRouter.route("/:user_name").get(getUserByName);

usersRouter.route("/:user_name/friends").patch(patchFriends);

module.exports = usersRouter;
