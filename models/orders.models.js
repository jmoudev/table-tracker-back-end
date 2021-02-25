const connection = require('../db/connection');

exports.sendOrderByTableId = (table_id, order) => {
  const { description, food_items } = order;
  // post order first
  // in return from post order get order_id
  // post into junction table with order_id

  return connection('orders')
    .insert({ table_id, description })
    .returning('*')
    .then(([order]) => {
      const { order_id } = order;
      console.log(food_items);

      // return connection('orders_food_junc').insert();
    });
};
