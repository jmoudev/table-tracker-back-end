exports.up = function (knex) {
  return knex.schema.createTable('tables', (tableTable) => {
    tableTable.increments('table_id').primary();
    tableTable.string('name').notNullable();
    tableTable.boolean('is_active').notNullable();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('tables');
};
