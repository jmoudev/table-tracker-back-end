exports.up = function (knex) {
  return knex.schema.createTable('food_items', (foodItemsTable) => {
    foodItemsTable.increments('food_item_id').primary();
    foodItemsTable.string('name').notNullable();
    foodItemsTable.float('price', 2).notNullable();
    foodItemsTable.string('course').notNullable();
    foodItemsTable.boolean('is_active').defaultTo(true)
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('food_items');
};
