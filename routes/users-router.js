const {
  getUsers,
  getUserByName,
  postUser,
  patchProgress,
  patchFollowing
} = require("../controllers/users-controllers");

const usersRouter = require("express").Router();

usersRouter.route("/").get(getUsers).post(postUser);

usersRouter.route("/:user_name").get(getUserByName);

usersRouter.route("/:user_name/following").patch(patchFollowing);

usersRouter.route("/:user_name/progress").patch(patchProgress);

module.exports = usersRouter;
