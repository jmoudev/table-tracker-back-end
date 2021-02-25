const { userData, foodData, tableData, orderData } = require('../data/index');

exports.seed = knex => {
  return knex.migrate
    .rollback()
    .then(() => {
      return knex.migrate.latest();
    })
    .then(() => {
      return knex('users').insert(userData).returning('*');
    })
    .then(() => {
      return knex('tables').insert(tableData).returning('*');
    })
    .then(() => {
      return knex('food_items').insert(foodData).returning('*');
    })
    .then(() => {
      const orders = orderData.map(({ table_id, description }) => ({
        table_id,
        description
      }));

      return knex('orders').insert(orders);
    })
    .then(() => {
      const food_items = orderData.map(({ table_id, food_items }) => ({
        table_id,
        food_items
      }));

      return knex('orders_food_junc').insert(food_items);
    });
};
