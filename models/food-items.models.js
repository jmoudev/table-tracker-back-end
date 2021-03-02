const connection = require('../db/connection');
const {
  handleBadRequest,
  handleRouteNotFound
} = require('../controllers/errors.controllers');

//GET
exports.selectFoodItems = () => {
  return connection.select('*').from('food_items');
};

//POST
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

//PATCH
exports.amendFoodItemsById = (food_item_id, name, price, course, is_active) => {
  if (!name | !price | !course) return handleBadRequest();

  return connection('food_items')
    .where({ food_item_id: food_item_id })
    .update({
      name: name,
      price: price,
      course: course,
      is_active: is_active
    })
    .returning('*')
    .then(([foodItems]) => {
      if (!foodItems) return handleRouteNotFound();
      else return { foodItems };
    });
};

//GET BYID
exports.selectFoodItemsById = food_item_id => {
  return connection
    .select('*')
    .from('food_items')
    .where({ food_item_id })
    .returning('*')
    .then(([foodItem]) => {
      if (!foodItem) return handleRouteNotFound();
      else return { foodItem };
    });
};
