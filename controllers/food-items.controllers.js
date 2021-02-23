const { selectFoodItems } = require("../models/food-items.models")

exports.getFoodItems = (req, res, next) => {
  console.log("inside getFoodItems controllers...")
  selectFoodItems().then((foodItems) => {
    res.send({ foodItems })
  })
}