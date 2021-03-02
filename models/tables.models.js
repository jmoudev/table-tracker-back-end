const knex = require('../db/connection');

exports.fetchAllTables = status => {
  return knex('tables')
    .select('*')
    .modify(query => {
      if (status) {
        query.where({ status });
      }
    });
};

exports.updateTableByTableId = (table_id, status) => {
  return knex('tables')
    .where({ table_id })
    .modify(query => {
      if (status) query.update({ status });
    })
    .returning('*')
    .then(([table]) => table);
};
