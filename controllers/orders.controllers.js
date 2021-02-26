const {
  sendOrderByTableId,
  fetchAllOrders,
} = require('../models/orders.models');

exports.postOrderByTableId = (req, res, next) => {
  const { table_id } = req.params;
  const order = req.body;

  sendOrderByTableId(table_id, order)
    .then((order) => {
      res.status(201).send({ order });
    })
    .catch(next);
};

exports.getAllOrders = (req, res, next) => {
  const { is_active } = req.query;
  fetchAllOrders(is_active)
    .then((orders) => {
      res.status(200).send({ orders });
    })
    .catch(next);
};
