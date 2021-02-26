const foodItemsRouter = require('./food-items.router');
const ordersRouter = require('./orders.router');
const tablesRouter = require('./tables.router');
const usersRouter = require('./users.router');

const apiRouter = require('express').Router();

apiRouter.use('/food_items', foodItemsRouter);
apiRouter.use('/orders', ordersRouter);
apiRouter.use('/tables', tablesRouter);
apiRouter.use('/users', usersRouter);

module.exports = apiRouter;
