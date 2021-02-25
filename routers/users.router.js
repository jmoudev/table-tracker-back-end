const usersRouter = require('express').Router();
const {
  getAllUsers,
  deleteUserById
} = require('../controllers/users.controllers');

usersRouter.route('/').get(getAllUsers);

usersRouter.route('/:user_id').delete(deleteUserById);

module.exports = usersRouter;
