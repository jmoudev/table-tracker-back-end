const {
  getAllTables,
  patchTableByTableId
} = require('../controllers/tables.controllers');
const {
  postOrderByTableId,
  patchOrderByTableId
} = require('../controllers/orders.controllers');

const tablesRouter = require('express').Router();

tablesRouter.route('/').get(getAllTables);
tablesRouter.route('/:table_id').patch(patchTableByTableId);
tablesRouter
  .route('/:table_id/orders')
  .post(postOrderByTableId)
  .patch(patchOrderByTableId);

module.exports = tablesRouter;
