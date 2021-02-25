const { getAllTables } = require('../controllers/tables.controllers');
const { postOrderByTableId } = require('../controllers/orders.controllers');

const tablesRouter = require('express').Router();

tablesRouter.route('/').get(getAllTables);
tablesRouter.route('/:table_id/orders').post(postOrderByTableId);

module.exports = tablesRouter;
