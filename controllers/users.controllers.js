const { fetchAllUsers, removeUserById } = require('../models/users.models');

const getAllUsers = (req, res, next) => {
  fetchAllUsers()
    .then((users) => {
      res.send({ users });
    })
    .catch(next);
};

const deleteUserById = (req, res, next) => {
  const { user_id } = req.params;
  removeUserById(user_id)
    .then(() => res.sendStatus(204))
    .catch(next);
};

module.exports = { getAllUsers, deleteUserById };
