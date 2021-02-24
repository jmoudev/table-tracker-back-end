exports.up = function (knex) {
  return knex.schema.createTable('orders_food_junc', foodOrdersTable => {
    foodOrdersTable.increments('food_order_id').primary();
    foodOrdersTable
      .integer('order_id')
      .references('orders.order_id')
      .notNullable();
    foodOrdersTable
      .integer('food_item_id')
      .references('food_items.food_item_id')
      .notNullable();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('orders_food_junc');
};
