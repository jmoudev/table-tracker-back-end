module.exports = {
  'GET /api': {
    description:
      'serves up a json representation of all the available endpoints of the api'
  },
  'POST /table/:table_id/orders': {
    description:
      'creates a new order for requested table and responds with the new order object',
    queries: null,
    exampleRequestBody: {
      table_name: 'Table 3',
      food_array: ['beef tacos', 'lamb tacos', 'etc'],
      description: 'Nut allergy'
    },
    exampleResponse: {
      order_id: 1,
      table_id: 1,
      food_id: [1, 2],
      description: 'Nut allergy',
      is_ready: false
    }
  }
};
