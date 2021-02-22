exports.up = function (knex) {
  console.log('creating food_items table');
  return knex.schema.createTable('food_items', (foodItemsTable) => {
    foodItemsTable.increments('food_item_id').primary();
    foodItemsTable.string('name').notNullable();
    foodItemsTable.integer('price').notNullable();
    foodItemsTable.string('course').notNullable();
  });
};

exports.down = function (knex) {
  console.log('dropping food_items table');
  return knex.schema.dropTable('food_items');
};
