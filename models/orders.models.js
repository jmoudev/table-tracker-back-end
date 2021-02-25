const connection = require('../db/connection');

exports.sendOrderByTableId = (table_id, order) => {
  const { description } = order;

  // post order first
  // in return from post order get ordere_id
  // post into junc table with order_id
  //

  return connection('orders')
    .insert({ table_id, description })
    .returning('*')
    .then(([order]) => {
      return order;
    });
};
