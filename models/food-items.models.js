const connection = require("../db/connection");

exports.selectFoodItems = () => {
  return connection
  .select("*")
  .from("food_items")
}

exports.appendFoodItems = (name, price, course) => {
  return connection("food_items")
  .insert({
    "name": name, 
    "price": price, 
    "course": course,
  })
  .returning("*")
  .then(([ foodItems ]) => {
    return { foodItems }
  })
}