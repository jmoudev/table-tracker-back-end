const ordersRouter = require('express').Router();
const { getAllOrders } = require('../controllers/orders.controllers');

ordersRouter.route('/').get(getAllOrders);

module.exports = ordersRouter;
