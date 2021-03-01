const { fetchAllTables } = require('../models/tables.models');

exports.getAllTables = (req, res, next) => {
  const { status } = req.query;

  fetchAllTables(status)
    .then(tables => {
      res.status(200).send({ tables });
    })
    .catch(next);
};
