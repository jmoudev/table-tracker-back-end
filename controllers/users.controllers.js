const { fetchAllUsers } = require('../models/users.models');

const getAllUsers = (req, res, next) => {
  fetchAllUsers()
    .then((users) => {
      res.send({ users });
    })
    .catch(next);
};

module.exports = { getAllUsers };
