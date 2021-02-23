const connection = require('../db/connection');

const fetchAllUsers = () => {
  return connection('users')
    .returning('*')
    .then((users) => {
      return users;
    })
    .catch(next);
};

module.exports = { fetchAllUsers };
