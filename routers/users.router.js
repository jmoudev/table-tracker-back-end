const usersRouter = require('express').Router();
const {
  getAllUsers,
  deleteUserById,
  postNewUser,
  patchUserById
} = require('../controllers/users.controllers');

usersRouter.route('/').get(getAllUsers).post(postNewUser);

usersRouter.route('/:user_id').patch(patchUserById).delete(deleteUserById);

module.exports = usersRouter;
