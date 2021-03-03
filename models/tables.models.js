const knex = require('../db/connection');

exports.fetchAllTables = (status) => {
  return knex('tables')
    .select('*')
    .modify((query) => {
      if (status) {
        query.where({ status });
      }
    });
};
