const {
  fetchAllTables,
  updateTableByTableId
} = require('../models/tables.models');

exports.getAllTables = (req, res, next) => {
  const { status } = req.query;

  fetchAllTables(status)
    .then(tables => {
      res.status(200).send({ tables });
    })
    .catch(next);
};

exports.patchTableByTableId = (req, res, next) => {
  const { table_id } = req.params;
  const { status } = req.body;

  updateTableByTableId(table_id, status)
    .then(table => {
      res.status(200).send({ table });
    })
    .catch(next);
};
