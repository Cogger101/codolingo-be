const {
  findUsers,
  findUserByName,
  insertUser,
} = require("../Models/users-models");

exports.getUsers = (req, res, next) => {
  findUsers()
    .then((users) => {
      res.status(200).send({ users });
    })
    .catch(next);
};

exports.getUserByName = (req, res, next) => {
  const { user_name } = req.params;
  findUserByName(user_name)
    .then((user) => {
      res.status(200).send({ user });
    })
    .catch(next);
};

exports.postUser = (req, res, next) => {
  const newUser = req.body;
  insertUser(newUser)
    .then((postedUser) => {
      res.status(201).send({ postedUser });
    })
    .catch(next);
};
