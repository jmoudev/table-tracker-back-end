const connection = require('../db/connection');
const { handleBadRequest } = require('../controllers/errors.controllers');

exports.sendOrderByTableId = async (table_id, orderBody) => {
  const { description, food_items } = orderBody;

  if (!food_items) {
    return handleBadRequest();
  }

  const [orderWithOutFoodItems] = await connection('orders')
    .insert({ table_id, description })
    .returning('*');

  const { order_id } = order;

  await postFoodItemsByOrderId(order_id, food_items);

  const foodIds = await getOrderFoodsByOrderId(order_id);

  const orderWithFoodItems = { ...orderWithOutFoodItems };

  orderWithFoodItems.food_items = foodIds;

  return orderWithFoodItems;
};

// exports.updateOrderByTableId = (table_id, body) => {
//   return connection('orders')
//     .select('*')
//     .where({ table_id, is_active: true })
//     .then(([order]) => {
//       // if (!orders.length) {
//       // }
//       // if (orders.length > 1) {
//       // }
//       // console.log(order);

//       return order;
//     })
//     .then(order => {
//       const { order_id } = order;

//       return connection('orders_food_junc')
//         .select('*')
//         .where({ order_id })
//         .then(juncArr => {
//           const orderWithFoodItems = { ...order };
//           const foodsArr = juncArr.map(food => food.food_item_id);

//           orderWithFoodItems.food_items = foodsArr;

//           return orderWithFoodItems;
//         });
//     });
// };

// postFoodToJuncTable
// takes order_id and food items and posts returning nothing

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
