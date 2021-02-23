const { getAllTables } = require('../controllers/tables.controllers');
const tablesRouter = require('express').Router();

tablesRouter.route('/').get(getAllTables);

module.exports = tablesRouter;
