const knex = require('../db/connection');

exports.fetchAllTables = () => {
  return knex('tables').select('*');
};
