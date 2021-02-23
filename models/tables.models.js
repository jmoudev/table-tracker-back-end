const knex = require('../db/connection');

exports.fetchAllTables = is_active => {
  return knex('tables')
    .select('*')
    .modify(query => {
      if (is_active) {
        query.where({ is_active });
      }
    });
};
