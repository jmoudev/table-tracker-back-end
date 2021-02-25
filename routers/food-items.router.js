const foodItemsRouter = require('express').Router();
const { getFoodItems, addFoodItems, updateFoodItemsById } = require('../controllers/food-items.controllers')

foodItemsRouter.route('/').get(getFoodItems).post(addFoodItems)
foodItemsRouter.route('/:food_item_id').patch(updateFoodItemsById);

module.exports = foodItemsRouter;
