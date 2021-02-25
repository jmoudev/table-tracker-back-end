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

exports.updateOrderByTableId = (table_id, body) => {
  console.log(table_id, body);

  // first check if only one active order per the chosen table if not throw err
  // get single order_id
  // need to go into orders table and filter where tbale tbale_id and where
  return connection('orders')
    .select('*')
    .where({ table_id, is_active: true })
    .then(order => {
      console.log(order);
    });
};
