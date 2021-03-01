const {
  sendOrderByTableId,
  fetchAllOrders,
  updateOrderByTableId,
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
      console.log(orders);
      res.status(200).send({ orders });
    })
    .catch(next);
};

exports.patchOrderByTableId = (req, res, next) => {
  const { table_id } = req.params;
  const {
    starters_ready,
    mains_ready,
    desserts_ready,
    drinks_ready,
    is_active,
    add_foods,
  } = req.body;

  updateOrderByTableId(
    table_id,
    starters_ready,
    mains_ready,
    desserts_ready,
    drinks_ready,
    is_active,
    add_foods
  )
    .then((order) => {
      res.status(200).send({ order });
    })
    .catch(next);
};
