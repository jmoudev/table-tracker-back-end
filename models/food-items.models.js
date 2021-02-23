const connection = require("../db/connection");

exports.selectFoodItems = () => {
  console.log("inside select foodItems model...")
  return connection
  .select("*")
  .from("food_items")
}