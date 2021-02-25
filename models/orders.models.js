const connection = require('../db/connection');
const { handleBadRequest } = require('../controllers/errors.controllers');

exports.sendOrderByTableId = (table_id, order) => {
  const { description, food_items } = order;

  if (!food_items) {
    return handleBadRequest();
  }

  return connection('orders')
    .insert({ table_id, description })
    .returning('*')
    .then(([order]) => {
      const { order_id } = order;

      const junc_pairs = food_items.map(food_item_id => {
        return { order_id, food_item_id };
      });

      return connection('orders_food_junc')
        .insert(junc_pairs)
        .then(() => {
          const orderWithFoodItems = { ...order };
          orderWithFoodItems.food_items = food_items;

          return orderWithFoodItems;
        });
    });
};
