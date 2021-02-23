const ordersRouter = require('express').Router();

ordersRouter.route('/').get((req, res, next) => {
  console.log('hello world!!!');
  res.sendStatus(200);
});

module.exports = ordersRouter;
