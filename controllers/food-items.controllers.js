const {
  selectFoodItems,
  appendFoodItems,
  amendFoodItemsById
} = require('../models/food-items.models');

//GET
exports.getFoodItems = (req, res, next) => {
  selectFoodItems().then(foodItems => {
    res.send({ foodItems });
  }).catch(next)
};

//POST
exports.addFoodItems = (req, res, next) => {
  const { name, price, course } = req.body;
  appendFoodItems(name, price, course)
    .then(foodItems => {
      res.status(201).send(foodItems);
    })
    .catch(next);
};

//PATCH
exports.updateFoodItemsById = (req, res, next) => {
  const { food_item_id } = req.params;
  const { name, price, course, is_active } = req.body;
  amendFoodItemsById(food_item_id, name, price, course, is_active)
    .then(foodItems => {
      res.status(201).send(foodItems);
    })
    .catch(next);
};
