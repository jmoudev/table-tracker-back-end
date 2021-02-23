module.exports = {
  'GET /api': {
    description:
      'serves up a json representation of all the available endpoints of the api'
  },
  'GET /api/orders': {
    description: 'serves up an array of all orders',
    queries: null,
    exampleResponse: {
      orders: [
        {
          order_id: 1,
          table_name: 'table 3',
          food_items: ['lamb tacos', 'beef tacos', 'water'],
          description: 'nut allergy',
          is_ready: true
        }
      ]
    }
  },
  'GET /api/tables': {
    description: 'serves up an array of all tables',
    queries: { is_active: [true, false] },
    exampleResponse: {
      tables: [
        {
          table_id: 1,
          table_name: 'table 1',
          is_active: true
        }
      ]
    }
  },
  'PATCH /api/tables/:table_id/orders': {
    description: '',
    queries: null,
    exampleRequestBody: {},
    exampleResponse: {}
  },
  'POST /tables/:table_id/orders': {
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
