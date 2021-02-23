const { fetchAllUsers } = require('../models/users.models');

const getAllUsers = (req, res, next) => {
  res.sendStatus(200);
};

module.exports = { getAllUsers };
