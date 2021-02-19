const { userData, foodData, tableData } = require('../data/index');

exports.seed = async (knex) => {
  await knex.migrate.rollback();
  await knex.migrate.latest();

  const userPromise = knex('users').insert(userData, '*');
  const foodPromise = knex('food').insert(foodData, '*');
  await Promise.all([userPromise, foodPromise]);
};
