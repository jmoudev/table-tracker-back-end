const connection = require("../db/connection");

exports.selectFoodItems = () => {
  console.log("inside select foodItems model...")
  return connection
  .select("*")
  .from("food_items")
}

exports.appendFoodItems = (name, price, course) => {
  console.log("inside appendFoodItems model...")
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