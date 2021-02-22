exports.up = function (knex) {
  console.log('creating orders table');
  return knex.schema.createTable('orders', (ordersTable) => {
    ordersTable.increments('order_id').primary();
    ordersTable.integer('table_id').references('tables.table_id').notNullable();
    ordersTable
      .integer('food_item_id')
      .references('food_items.food_item_id')
      .notNullable();
    ordersTable.string('description');
    ordersTable.boolean('is_ready').notNullable();
  });
};

exports.down = function (knex) {
  console.log('dropping orders table');
  return knex.schema.dropTable('orders');
};
