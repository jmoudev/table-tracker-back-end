const connection = require('../db/connection');

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
  const newUser = { email, first_name, last_name, role };

  return connection('users')
    .insert(newUser)
    .returning('*')
    .then(([user]) => user);
};

module.exports = { fetchAllUsers, removeUserById, addUser };
