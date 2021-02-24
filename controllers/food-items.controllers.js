const { selectFoodItems, appendFoodItems } = require("../models/food-items.models")

//GET
exports.getFoodItems = (req, res, next) => {
  selectFoodItems().then((foodItems) => {
    res.send({ foodItems })
  })
}

//POST
exports.addFoodItems = (req, res, next) => {
  const { name, price, course } = req.body;
  appendFoodItems(name, price, course).then((foodItems) => {
    res.status(201).send(foodItems)
  }).catch(next)
}