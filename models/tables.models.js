const knex = require('../db/connection');
const { handleRouteNotFound } = require('../controllers/errors.controllers');

exports.fetchAllTables = status => {
  return knex('tables')
    .select('*')
    .modify((query) => {
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
    .then(tableArr => {
      if (!tableArr.length) {
        return handleRouteNotFound();
      } else {
        const [table] = tableArr;
        return table;
      }
    });
};
