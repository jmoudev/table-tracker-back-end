const usersRouter = require('express').Router();
const {
  getAllUsers,
  deleteUserById,
  postNewUser
} = require('../controllers/users.controllers');

usersRouter.route('/').get(getAllUsers).post(postNewUser);

usersRouter.route('/:user_id').delete(deleteUserById);

module.exports = usersRouter;
