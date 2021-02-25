const { handleBadRequest } = require("../controllers/errors.controllers");
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

exports.amendFoodItemsById = (food_item_id, name, price, course) => {
  console.log("inside amendFoodItemsById models...")

  if (!name | !price | !course) return handleBadRequest();

  return connection("food_items")
  .where({ "food_item_id" : food_item_id })
  .update({
    "name" : name,
    "price" : price,
    "course" : course,
  })
  .returning("*")
  .then(([ foodItems ]) => {
    console.log(foodItems)
    if (!foodItems) return Promise.reject({ status: 404, msg: "Not Found" })
    else return { foodItems }
  })
}