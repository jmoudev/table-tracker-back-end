const {
  sendOrderByTableId,
  updateOrderByTableId
} = require('../models/orders.models');

exports.postOrderByTableId = (req, res, next) => {
  const { table_id } = req.params;
  const order = req.body;

  sendOrderByTableId(table_id, order)
    .then(order => {
      res.status(201).send({ order });
    })
    .catch(next);
};

exports.patchOrderByTableId = (req, res, next) => {
  const { table_id } = req.params;
  const { body } = req;

  updateOrderByTableId(table_id, body)
    .then(order => {
      res.status(200).send({ order });
    })
    .catch(next);
};
