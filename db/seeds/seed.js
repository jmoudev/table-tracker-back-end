const { userData, foodData, tableData, orderData } = require('../data/index');

exports.seed = (knex) => {
  const food_items = orderData.map(({ food_items }, index) => {
    // food items array per map
    // need to return
    const order_id = index + 1;
    const foodItemsWithOrder = [];

    food_items.forEach((food_item_id) => {
      foodItemsWithOrder.push({ order_id, food_item_id });
    });

    return foodItemsWithOrder;
  });

  return knex.migrate
    .rollback()
    .then(() => {
      return knex.migrate.latest();
    })
    .then(() => {
      return knex('users').insert(userData).returning('*');
    })
    .then(() => {
      return knex('tables').insert(tableData).returning('*');
    })
    .then(() => {
      return knex('food_items').insert(foodData).returning('*');
    })
    .then(() => {
      const orders = orderData.map(({ table_id, description, is_active }) => {
        const order = { table_id, description };

        if (typeof is_active === 'boolean') order.is_active = is_active;

        return order;
      });

      return knex('orders').insert(orders);
    })
    .then(() => {
      return knex('orders_food_junc').insert(food_items[0]);
    })
    .then(() => {
      return knex('orders_food_junc').insert(food_items[1]);
    })
    .then(() => {
      return knex('orders_food_junc').insert(food_items[2]);
    });
};
