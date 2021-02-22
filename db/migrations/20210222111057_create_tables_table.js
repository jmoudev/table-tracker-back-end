exports.up = function (knex) {
  console.log('creating tables table');
  return knex.schema.createTable('tables', (tableTable) => {
    tableTable.increments('table_id').primary();
    tableTable.string('name').notNullable();
    tableTable.boolean('is_active').notNullable();
  });
};

exports.down = function (knex) {
  console.log('dropping tables table');
  return knex.schema.dropTable('tables');
};
