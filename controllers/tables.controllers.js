const { fetchAllTables } = require('../models/tables.models');

exports.getAllTables = (req, res, next) => {
  fetchAllTables().then(tables => {
    res.status(200).send({ tables });
  });
};
