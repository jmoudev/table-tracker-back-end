const ordersRouter = require('express').Router();

ordersRouter.get('/', (req, res, next) => {
  console.log('hello world!!!');
  res.sendStatus(200);
});

module.exports = ordersRouter;
