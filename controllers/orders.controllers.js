const { sendOrderByTableId } = require('../models/orders.models');

exports.postOrderByTableId = (req, res, next) => {
  const { table_id } = req.params;
  const order = req.body;

  sendOrderByTableId(table_id, order).then(order => {
    res.status(201).send({ order });
  });
};
