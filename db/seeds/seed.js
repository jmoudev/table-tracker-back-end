const { userData, foodData, tableData, orderData } = require('../data/index');

exports.seed = async knex => {
  const foodItems = orderData.map(({ food_items }, index) => {
    const order_id = index + 1;
    const orderFoods = [];

    food_items.forEach(food_item_id => {
      orderFoods.push({ order_id, food_item_id });
    });

    return orderFoods;
  });

  await knex.migrate.rollback();
  await knex.migrate.latest();

  const usersPromise = knex('users').insert(userData).returning('*');
  const tablesPromise = knex('tables').insert(tableData).returning('*');
  const foodsPromise = knex('food_items').insert(foodData).returning('*');

  await Promise.all([usersPromise, tablesPromise, foodsPromise]);

  const orders = orderData.map(({ table_id, description }) => ({
    table_id,
    description
  }));

  await knex('orders').insert(orders);

  const foodPromises = [];

  foodItems.forEach(food => {
    foodPromises.push(knex('orders_food_junc').insert(food));
  });

  await Promise.all(foodPromises);
};
