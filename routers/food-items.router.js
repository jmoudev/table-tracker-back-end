const foodItemsRouter = require('express').Router();

foodItemsRouter.route('/').get((req, res, next) => {
  res.sendStatus(200);
});

module.exports = foodItemsRouter;
