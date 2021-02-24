exports.up = function (knex) {
  return knex.schema.createTable('orders_food_junc', foodOrdersTable => {
    foodOrdersTable.increments().primary();
    foodOrdersTable.integer('').references('orders.order_id').notNullable();
    foodOrdersTable
      .integer('')
      .references('food_items.food_item_id')
      .notNullable();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('orders_food_junc');
};
