const { userData, foodData, tableData } = require('../data/index');

exports.seed = knex => {
  return knex.migrate
    .rollback()
    .then(() => {
      return knex.migrate.latest();
    })
    .then(() => {
      return knex('users').insert(userData).returning('*');
    })
    .then(() => {
      return knex('tables').insert(tableData).returning('*');
    })
    .then(() => {
      return knex('food_items').insert(foodData).returning('*');
    });
};
