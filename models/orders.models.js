const connection = require('../db/connection');
const { handleBadRequest } = require('../controllers/errors.controllers');

exports.sendOrderByTableId = (table_id, order) => {
  const { description, food_items } = order;

  if (!food_items) {
    return handleBadRequest();
  }

  return connection('orders')
    .insert({ table_id, description })
    .returning('*')
    .then(([order]) => {
      const { order_id } = order;

      const junc_pairs = food_items.map((food_item_id) => {
        return { order_id, food_item_id };
      });

      return connection('orders_food_junc')
        .insert(junc_pairs)
        .then(() => {
          const orderWithFoodItems = { ...order };
          orderWithFoodItems.food_items = food_items;

          return orderWithFoodItems;
        });
    });
};

exports.fetchAllOrders = async (is_active = true) => {
  const ordersWithoutFoods = await connection('orders')
    .select('*')
    .where({ is_active });
  const juncRows = await connection('orders_food_junc').select('*');
  const ordersFoodsLookup = {};

  juncRows.forEach(({ order_id, food_item_id }) => {
    if (!ordersFoodsLookup.hasOwnProperty(order_id)) {
      ordersFoodsLookup[order_id] = [];
    }
    ordersFoodsLookup[order_id].push(food_item_id);
  });

  return ordersWithoutFoods.map((order) => {
    const food_items = ordersFoodsLookup[order.order_id];
    return { ...order, food_items };
  });
};
