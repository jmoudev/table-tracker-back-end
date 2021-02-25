const connection = require('../db/connection');
const {
  handleBadRequest,
  handleRouteNotFound
} = require('../controllers/errors.controllers');

exports.selectFoodItems = () => {
  return connection.select('*').from('food_items');
};

exports.appendFoodItems = (name, price, course) => {
  return connection('food_items')
    .insert({
      name: name,
      price: price,
      course: course
    })
    .returning('*')
    .then(([foodItems]) => {
      return { foodItems };
    });
};

exports.amendFoodItemsById = (food_item_id, name, price, course) => {
  if (!name | !price | !course) return handleBadRequest();

  return connection('food_items')
    .where({ food_item_id: food_item_id })
    .update({
      name: name,
      price: price,
      course: course
    })
    .returning('*')
    .then(([foodItems]) => {
      if (!foodItems) return handleRouteNotFound();
      else return { foodItems };
    });
};
