const foodItemsRouter = require('express').Router();
const { getFoodItems, addFoodItems } = require('../controllers/food-items.controllers')

foodItemsRouter.route('/').get(getFoodItems).post(addFoodItems);

module.exports = foodItemsRouter;
