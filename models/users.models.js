const connection = require('../db/connection');
const {
  handleBadRequest,
  handleRouteNotFound
} = require('../controllers/errors.controllers');

const fetchAllUsers = () => {
  return connection('users')
    .returning('*')
    .then((users) => {
      return users;
    });
};

const removeUserById = (user_id) => {
  return connection('users')
    .del()
    .where({ user_id })
    .then((del_count) => {
      if (!del_count)
        return Promise.reject({
          status: 404,
          msg: `No user found for user id: ${user_id}`
        });
      return;
    });
};

const addUser = (email, first_name, last_name, role) => {
  const regex = /Staff|Admin/i;
  const validRole = regex.test(role);

  if (!first_name | !last_name | !email | !validRole) return handleBadRequest();

  return connection('users')
    .insert({ email, first_name, last_name, role })
    .returning('*')
    .then(([user]) => user);
};

const editUserById = () => {};

module.exports = { fetchAllUsers, removeUserById, addUser, editUserById };
