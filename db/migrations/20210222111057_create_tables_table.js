exports.up = function (knex) {
  return knex.schema.createTable('tables', (tableTable) => {
    tableTable.increments('table_id').primary();
    tableTable.string('name').notNullable();
    tableTable.string('status').defaultTo("default");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('tables');
};
