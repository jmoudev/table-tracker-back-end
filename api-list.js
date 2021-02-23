module.exports = {
  'GET /api': {
    description:
      'serves up a json representation of all the available endpoints of the api'
  },
  'GET /api/food-items' : {
    description: 'serves an array of all foodItems',
    queries: null, //can be added later
    exampleResponse: {
      foodItems : [
        {
          food_item_id: 1,
          name: 'Garlic Bread',
          price: 3.00,
          course: 'starter'
        }
      ]
    }
  },
  'POST /api/food-items': {
    description: 'serves an array of all foodItems',
    exampleResponse: {
      foodItems : [
        {
          food_item_id: 22,
          name: 'Pina Colada', 
          price: 8.00, 
          course: 'drinks'}
      ]
    }
  }
};
