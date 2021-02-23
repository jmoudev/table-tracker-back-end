const foodItemsRouter = require('express').Router();
const { getFoodItems } = require('../controllers/food-items.controllers')

foodItemsRouter.route('/').get(getFoodItems);

module.exports = foodItemsRouter;
