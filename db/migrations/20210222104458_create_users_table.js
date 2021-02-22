exports.up = function (knex) {
  console.log('creating users table');
  return knex.schema.createTable('users', (usersTable) => {
    usersTable.increments('user_id').primary();
    usersTable.string('first_name').notNullable();
    usersTable.string('last_name').notNullable();
    usersTable.string('role').notNullable();
  });
};

exports.down = function (knex) {
  console.log('dropping users table');
  return knex.schema.dropTable('users');
};
