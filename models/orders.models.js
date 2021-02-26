const connection = require('../db/connection');
const { handleBadRequest } = require('../controllers/errors.controllers');

exports.sendOrderByTableId = async (table_id, orderBody) => {
  const { description, food_items } = orderBody;

  if (!food_items) {
    return handleBadRequest();
  }

  const [orderWithoutFoodItems] = await connection('orders')
    .insert({ table_id, description })
    .returning('*');

  const { order_id } = orderWithoutFoodItems;

  await postFoodItemsByOrderId(order_id, food_items);

  const foodIds = await getOrderFoodsByOrderId(order_id);

  const orderWithFoodItems = { ...orderWithoutFoodItems };

  orderWithFoodItems.food_items = foodIds;

  return orderWithFoodItems;
};

exports.updateOrderByTableId = async (table_id, { add_foods }) => {
  const { order_id } = await getActiveOrderByTableId(table_id);

  if (add_foods) {
    await postFoodItemsByOrderId(order_id, add_foods);
  }
  // if active order
  const orderWithoutFoodItems = await getActiveOrderByTableId(table_id);

  const foodIds = await getOrderFoodsByOrderId(order_id);
  const orderWithFoodItems = { ...orderWithoutFoodItems };

  orderWithFoodItems.food_items = foodIds;

  return orderWithFoodItems;
};

const getActiveOrderByTableId = async table_id => {
  const [order] = await connection('orders')
    .select('*')
    .where({ table_id, is_active: true });

  return order;
};

const getOrderFoodsByOrderId = async order_id => {
  const juncRows = await connection('orders_food_junc')
    .select('*')
    .where({ order_id });

  const foodIds = juncRows.map(row => row.food_item_id);

  return foodIds;
};

const postFoodItemsByOrderId = (order_id, foodsArr) => {
  const juncPairsArr = foodsArr.map(food_item_id => {
    return { order_id, food_item_id };
  });

  return connection('orders_food_junc').insert(juncPairsArr);
};
