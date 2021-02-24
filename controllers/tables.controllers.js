const { fetchAllTables } = require('../models/tables.models');

exports.getAllTables = (req, res, next) => {
  const { is_active } = req.query;

  fetchAllTables(is_active)
    .then(tables => {
      res.status(200).send({ tables });
    })
    .catch(next);
};
