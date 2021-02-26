const foodItemsRouter = require('express').Router();
const {
  getFoodItems,
  addFoodItems,
  updateFoodItemsById,
  getFoodItemsById,
} = require('../controllers/food-items.controllers');

foodItemsRouter.route('/').get(getFoodItems).post(addFoodItems);
foodItemsRouter.route('/:food_item_id').patch(updateFoodItemsById).get(getFoodItemsById);

module.exports = foodItemsRouter;
