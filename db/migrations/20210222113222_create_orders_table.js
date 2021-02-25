exports.up = function (knex) {
  return knex.schema.createTable('orders', ordersTable => {
    ordersTable.increments('order_id').primary();
    ordersTable.integer('table_id').references('tables.table_id').notNullable();
    ordersTable.string('description');
    ordersTable.boolean('starters_ready').defaultTo(false);
    ordersTable.boolean('mains_ready').defaultTo(false);
    ordersTable.boolean('desserts_ready').defaultTo(false);
    ordersTable.boolean('drinks_ready').defaultTo(false);
    ordersTable.boolean('is_active').defaultTo(true);
    ordersTable.timestamp('created_at').defaultTo(knex.fn.now());
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('orders');
};
