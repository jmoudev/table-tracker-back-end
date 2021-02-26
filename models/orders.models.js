const connection = require('../db/connection');
const { handleBadRequest } = require('../controllers/errors.controllers');

exports.sendOrderByTableId = async (table_id, orderBody) => {
  const { description, food_items } = orderBody;

  if (!food_items) {
    return handleBadRequest();
  }
  console.log(food_items);

  const [orderWithoutFoodItems] = await connection('orders')
    .insert({ table_id, description })
    .returning('*');
  const { order_id } = orderWithoutFoodItems;

  await sendFoodItemsByOrderId(order_id, food_items);

  const foodIds = await fetchOrderFoodsByOrderId(order_id);
  const orderWithFoodItems = { ...orderWithoutFoodItems };

  orderWithFoodItems.food_items = foodIds;

  return orderWithFoodItems;
};

exports.updateOrderByTableId = async (
  table_id,
  starters_ready,
  mains_ready,
  desserts_ready,
  drinks_ready,
  is_active,
  add_foods
) => {
  const order_id = await fetchActiveOrderIdByTableId(table_id);

  const orderStatus = {
    starters_ready,
    mains_ready,
    desserts_ready,
    drinks_ready,
    is_active
  };

  for (status in orderStatus) {
    if (typeof orderStatus[status] !== 'boolean') {
      delete orderStatus[status];
    }
  }

  if (Object.keys(orderStatus).length) {
    updateOrderStatus(order_id, orderStatus);
  }

  const orderWithoutFoodItems = await fetchOrderByOrderId(order_id);

  if (add_foods) {
    await sendFoodItemsByOrderId(order_id, add_foods);
  }

  const foodIds = await fetchOrderFoodsByOrderId(order_id);
  const orderWithFoodItems = { ...orderWithoutFoodItems };

  orderWithFoodItems.food_items = foodIds;

  return orderWithFoodItems;
};

const updateOrderStatus = async (order_id, orderStatus) => {
  return connection('orders').update(orderStatus).where({ order_id });
};

const fetchActiveOrderIdByTableId = async table_id => {
  const [{ order_id }] = await connection('orders')
    .select('*')
    .where({ table_id, is_active: true });

  return order_id;
};

const fetchOrderByOrderId = async order_id => {
  const [order] = await connection('orders').select('*').where({ order_id });

  return order;
};

const fetchOrderFoodsByOrderId = async order_id => {
  const juncRows = await connection('orders_food_junc')
    .select('*')
    .where({ order_id });

  const foodIds = juncRows.map(row => row.food_item_id);

  return foodIds;
};

const sendFoodItemsByOrderId = (order_id, foodsArr) => {
  const juncPairsArr = foodsArr.map(food_item_id => {
    return { order_id, food_item_id };
  });

  return connection('orders_food_junc').insert(juncPairsArr);
};
