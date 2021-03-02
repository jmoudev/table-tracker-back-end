const request = require('supertest');

process.env.NODE_ENV = 'test';

const connection = require('../db/connection');

const app = require('../app');

describe('/api', () => {
  afterAll(() => connection.destroy());
  beforeEach(() => connection.seed.run());

  // Ayako BRANCH OUT FOR EACH REQUEST!! DON'T WORK ON MASTER
  describe('GET /api/food-items', () => {
    it('SUCCESS status 200 - responds with an array of all food_items', () => {
      return request(app)
        .get('/api/food-items')
        .expect(200)
        .then(({ body }) => {
          expect(body.foodItems).toHaveLength(21);
        });
    });
  });
  describe('POST /api/food-items', () => {
    it('SUCCESS status 201 - adds a food item to food_items table', () => {
      return request(app)
        .post('/api/food-items')
        .send({ name: 'Pina Colada', price: 8.0, course: 'drinks' })
        .expect(201)
        .then(({ body }) => {
          expect(body.foodItems.name).toBe('Pina Colada');
        });
    });
    it('ERROR status 400 - returns an error when a string is passed for price ', () => {
      return request(app)
        .post('/api/food-items')
        .send({ name: 'Pina Colada', price: 'eight pounds', course: 'drinks' })
        .expect(400)
        .then(({ body }) => {
          expect(body.msg).toEqual('Bad Request');
        });
    });
    it('ERROR status 400 - returns an error when a value is missing ', () => {
      return request(app)
        .post('/api/food-items')
        .send({ price: 8.0, course: 'drinks' })
        .expect(400)
        .then(({ body }) => {
          expect(body.msg).toEqual('Bad Request');
        });
    });
  });
  describe('PATCH /api/food-items/:food_item_id', () => {
    it('SUCCESS status 200 - changes a value of a food item', () => {
      return request(app)
        .patch('/api/food-items/1')
        .send({ name: 'New York Cheesecake', price: 4.5, course: 'dessert' })
        .expect(200)
        .then(({ body }) => {
          expect(body.foodItems).toEqual({
            food_item_id: 1,
            name: 'New York Cheesecake',
            price: 4.5,
            course: 'dessert',
            is_active: true
          });
        });
    });
    it('SUCCESS status 200 - changes active state of a food item', () => {
      return request(app)
        .patch('/api/food-items/1')
        .send({
          food_item_id: 1,
          name: 'Garlic Bread',
          price: 3.0,
          course: 'starter',
          is_active: false
        })
        .expect(200)
        .then(({ body }) => {
          expect(body.foodItems).toEqual({
            food_item_id: 1,
            name: 'Garlic Bread',
            price: 3.0,
            course: 'starter',
            is_active: false
          });
        });
    });
    it('ERROR status 400 - when food_id is not a number', () => {
      return request(app)
        .patch('/api/food-items/not-a-number')
        .send({ name: 'New York Cheesecake', price: 4.5, course: 'dessert' })
        .expect(400)
        .then(({ body }) => {
          expect(body.msg).toEqual('Bad Request');
        });
    });
    it('ERROR status 404 - when food_id is not on the db yet', () => {
      return request(app)
        .patch('/api/food-items/999')
        .send({ name: 'New York Cheesecake', price: 4.5, course: 'dessert' })
        .expect(404)
        .then(({ body }) => {
          expect(body.msg).toEqual('Not Found');
        });
    });
    it('ERROR status 400 - when a string is passed for price', () => {
      return request(app)
        .patch('/api/food-items/1')
        .send({
          name: 'New York Cheesecake',
          price: 'four pounds fifty',
          course: 'dessert'
        })
        .expect(400)
        .then(({ body }) => {
          expect(body.msg).toEqual('Bad Request');
        });
    });
    it('ERROR status 400 - returns an error when a value is missing', () => {
      return request(app)
        .patch('/api/food-items/1')
        .send({ name: 'New York Cheesecake', course: 'dessert' })
        .expect(400)
        .then(({ body }) => {
          expect(body.msg).toEqual('Bad Request');
        });
    });
  });

  describe('GET /api/food-items/:food_item_id', () => {
    it('SUCCESS status 200 - returns a food-item of food_item_id', () => {
      return request(app)
        .get('/api/food-items/1')
        .expect(200)
        .then(({ body }) => {
          expect(body.foodItem).toEqual({
            food_item_id: 1,
            name: 'Garlic Bread',
            price: 3,
            course: 'starter',
            is_active: true
          });
        });
    });
    it('ERROR status 400 - when food_item_id is not a number', () => {
      return request(app)
        .get('/api/food-items/not-a-number')
        .expect(400)
        .then(({ body }) => {
          expect(body.msg).toEqual('Bad Request');
        });
    });
    it('ERROR status 404 - when food_item_id is not on the db yet', () => {
      return request(app)
        .get('/api/food-items/999')
        .expect(404)
        .then(({ body }) => {
          expect(body.msg).toEqual('Not Found');
        });
    });
  });

  //Joe BRANCH OUT FOR EACH REQUEST!! DON'T WORK ON MASTER
  describe('/api/orders', () => {
    it('ERROR - status 405 - method not allowed', () => {});

    describe('GET all orders', () => {
      it('SUCCESS - status 200 - returns array of all orders with is_active query defaulted to true', () => {
        return request(app)
          .get('/api/orders')
          .expect(200)
          .then(({ body }) => {
            body.orders.forEach(order => {
              expect(order).toEqual(
                expect.objectContaining({
                  order_id: expect.any(Number),
                  table_id: expect.any(Number),
                  description: expect.any(String),
                  food_items: expect.arrayContaining([
                    expect.objectContaining({
                      food_item_id: expect.any(Number),
                      name: expect.any(String),
                      price: expect.any(Number),
                      course: expect.any(String),
                      is_active: expect.any(Boolean)
                    })
                  ]),
                  starters_ready: expect.any(Boolean),
                  mains_ready: expect.any(Boolean),
                  desserts_ready: expect.any(Boolean),
                  drinks_ready: expect.any(Boolean),
                  is_active: true,
                  created_at: expect.any(String)
                })
              );
            });
          });
      });
      it('SUCCESS - status 200 - returns array of all orders with isActive query to filter active orders', () => {
        return request(app)
          .get('/api/orders?is_active=false')
          .expect(200)
          .then(({ body }) => {
            body.orders.forEach(order => {
              expect(order).toEqual(
                expect.objectContaining({
                  order_id: expect.any(Number),
                  table_id: expect.any(Number),
                  description: expect.any(String),
                  food_items: expect.any(Array),
                  starters_ready: expect.any(Boolean),
                  mains_ready: expect.any(Boolean),
                  desserts_ready: expect.any(Boolean),
                  drinks_ready: expect.any(Boolean),
                  is_active: false,
                  created_at: expect.any(String)
                })
              );
            });
          });
      });
      it('ERRROR - status 400 - bad request on is_active query', () => {
        return request(app)
          .get('/api/orders?is_active=not-a-bool')
          .expect(400)
          .then(({ body }) => {
            expect(body.msg).toEqual('Bad Request');
          });
      });
    });
  });

  //Joe BRANCH OUT FOR EACH REQUEST!! DON'T WORK ON MASTER
  describe('/api/tables', () => {
    describe('/api/tables', () => {
      describe('GET all tables', () => {
        it('SUCCESS - status 200 - returns all tables', () => {
          return request(app)
            .get('/api/tables')
            .expect(200)
            .then(({ body }) => {
              expect(body.tables).toHaveLength(8);
              body.tables.forEach(table => {
                expect(table).toEqual(
                  expect.objectContaining({
                    table_id: expect.any(Number),
                    name: expect.any(String),
                    status: expect.stringMatching(
                      /default|served|waiting-food|active/
                    )
                  })
                );
              });
            });
        });
        it('SUCCESS - status 200 - returns array of tables with status query filtering based on whether the table status', () => {
          return request(app)
            .get('/api/tables?status=default')
            .expect(200)
            .then(({ body }) => {
              expect(body.tables).toHaveLength(2);
              body.tables.forEach(table => {
                expect(table).toEqual(
                  expect.objectContaining({
                    status: 'default'
                  })
                );
              });
            });
        });
      });
    });
    describe('/api/tables/:table_id', () => {
      describe.only('PATCH table by table_id', () => {
        it('SUCCESS - status 200 - return table when empty body provided', () => {
          return request(app)
            .patch('/api/tables/1')
            .send({})
            .expect(200)
            .then(({ body }) => {
              expect(body.table).toEqual(
                expect.objectContaining({
                  table_id: 1,
                  name: expect.any(String),
                  status: expect.stringMatching(
                    /default|served|waiting-food|active/
                  )
                })
              );
            });
        });
        it('SUCCESS - status 200 - return table with amended status property when provided in body', () => {
          return request(app)
            .patch('/api/tables/1')
            .send({ status: 'active' })
            .expect(200)
            .then(({ body }) => {
              expect(body.table).toEqual(
                expect.objectContaining({
                  table_id: 1,
                  name: expect.any(String),
                  status: 'active'
                })
              );
            });
        });
        it('ERROR - status 404 - table_id not found', () => {
          return request(app)
            .patch('/api/tables/999')
            .send({})
            .expect(404)
            .then(({ body }) => {
              expect(body.msg).toEqual('Not Found');
            });
        });
        it('ERROR - status 400 - bad request on table_id', () => {
          return request(app)
            .patch('/api/tables/not-an-id')
            .send({})
            .expect(400)
            .then(({ body }) => {
              expect(body.msg).toEqual('Bad Request');
            });
        });
        it('ERROR - status 400 - bad request incorrect status in body', () => {
          return request(app)
            .patch('/api/tables/not-an-id')
            .send({})
            .expect(400)
            .then(({ body }) => {
              expect(body.msg).toEqual('Bad Request');
            });
        });
      });
    });

    describe('/api/tables/:table_id/orders', () => {
      describe('PATCH order by table_id', () => {
        it('SUCCESS - status 200 - return specified active table order when empty body provided', () => {
          return request(app)
            .patch('/api/tables/1/orders')
            .send({})
            .expect(200)
            .then(({ body }) => {
              expect(body.order).toEqual(
                expect.objectContaining({
                  order_id: expect.any(Number),
                  table_id: 1,
                  description: expect.any(String),
                  food_items: expect.any(Array),
                  starters_ready: expect.any(Boolean),
                  mains_ready: expect.any(Boolean),
                  desserts_ready: expect.any(Boolean),
                  drinks_ready: expect.any(Boolean),
                  is_active: true,
                  created_at: expect.any(String)
                })
              );
            });
        });
        it('SUCCESS - status 200 - return specified order with course_ready and is_active boolean value changed', () => {
          return request(app)
            .patch('/api/tables/1/orders')
            .send({
              starters_ready: true,
              mains_ready: true,
              drinks_ready: true,
              desserts_ready: true,
              is_active: false
            })
            .expect(200)
            .then(({ body }) => {
              expect(body.order).toEqual(
                expect.objectContaining({
                  order_id: expect.any(Number),
                  table_id: 1,
                  description: expect.any(String),
                  food_items: expect.any(Array),
                  starters_ready: true,
                  mains_ready: true,
                  desserts_ready: true,
                  drinks_ready: true,
                  is_active: false,
                  created_at: expect.any(String)
                })
              );
            });
        });
        it('SUCCESS - status 200 - return specified order with some of course_ready and is_active boolean values changed', () => {
          return request(app)
            .patch('/api/tables/1/orders')
            .send({
              starters_ready: true,
              mains_ready: true
            })
            .expect(200)
            .then(({ body }) => {
              expect(body.order).toEqual(
                expect.objectContaining({
                  order_id: expect.any(Number),
                  table_id: 1,
                  description: expect.any(String),
                  food_items: expect.any(Array),
                  starters_ready: true,
                  mains_ready: true,
                  desserts_ready: false,
                  drinks_ready: false,
                  is_active: true,
                  created_at: expect.any(String)
                })
              );
            });
        });
        it('SUCCESS - status 200 - return specified order with food-items added to order', () => {
          return request(app)
            .patch('/api/tables/1/orders')
            .send({ add_foods: [6, 7, 8] })
            .expect(200)
            .then(({ body }) => {
              expect(body.order).toEqual(
                expect.objectContaining({
                  table_id: 1,
                  food_items: [1, 2, 3, 4, 5, 6, 7, 8],
                  is_active: true
                })
              );
            });
        });
        it('ERROR - status 404 - table does not exist', () => {
          return request(app)
            .patch('/api/tables/999/orders')
            .send({})
            .expect(404)
            .then(({ body }) => {
              expect(body.msg).toEqual('Not Found');
            });
        });
        it('ERROR - status 404 - no active orders on table', () => {
          return request(app)
            .patch('/api/tables/3/orders')
            .send({})
            .expect(404)
            .then(({ body }) => {
              expect(body.msg).toEqual('Not Found');
            });
        });
        it('ERROR - status 400 - bad request on table_id', () => {
          return request(app)
            .patch('/api/tables/not-an-id/orders')
            .send({})
            .expect(400)
            .then(({ body }) => {
              expect(body.msg).toEqual('Bad Request');
            });
        });
        it('ERROR - status 400 - bad request body incorrect type on course_ready or is_active', () => {
          return request(app)
            .patch('/api/tables/1/orders')
            .send({ is_active: 'not-a-bool' })
            .expect(400)
            .then(({ body }) => {
              expect(body.msg).toEqual('Bad Request');
            });
        });
        it('ERROR - status 404 - bad request body incorrect type on food_order_items', () => {
          return request(app)
            .patch('/api/tables/1/orders')
            .send({ add_foods: ['not-a-number'] })
            .expect(400)
            .then(({ body }) => {
              expect(body.msg).toEqual('Bad Request');
            });
        });
      });
      describe('POST order by table_id', () => {
        it('SUCCESS - status 201 - returns a new order', () => {
          return request(app)
            .post('/api/tables/3/orders')
            .send({
              food_items: [1, 2, 3, 4, 5, 6],
              description: 'dairy allergy'
            })
            .expect(201)
            .then(({ body }) => {
              expect(body.order).toEqual(
                expect.objectContaining({
                  order_id: expect.any(Number),
                  table_id: 3,
                  description: 'dairy allergy',
                  food_items: [1, 2, 3, 4, 5, 6],
                  starters_ready: expect.any(Boolean),
                  mains_ready: expect.any(Boolean),
                  desserts_ready: expect.any(Boolean),
                  drinks_ready: expect.any(Boolean),
                  is_active: expect.any(Boolean),
                  created_at: expect.any(String)
                })
              );
            });
        });
        it('ERROR - status 404 - table does not exist', () => {
          return request(app)
            .post('/api/tables/999/orders')
            .send({
              food_items: [1, 2, 3, 4, 5, 6],
              description: 'dairy allergy'
            })
            .expect(404)
            .then(({ body }) => {
              expect(body.msg).toBe('Not Found');
            });
        });
        it('ERROR - status 400 - bad request on table_id', () => {
          return request(app)
            .post('/api/tables/not-an-id/orders')
            .send({
              food_items: [1, 2, 3, 4, 5, 6],
              description: 'dairy allergy'
            })
            .expect(400)
            .then(({ body }) => {
              expect(body.msg).toBe('Bad Request');
            });
        });
        it('ERROR - status 400 - bad request body missing required field', () => {
          return request(app)
            .post('/api/tables/1/orders')
            .send({
              description: 'dairy allergy'
            })
            .expect(400)
            .then(({ body }) => {
              expect(body.msg).toBe('Bad Request');
            });
        });
        it('ERROR - status 400 - bad request food-item not valid', () => {
          return request(app)
            .post('/api/tables/1/orders')
            .send({
              food_items: ['invalid-food-id'],
              description: 'dairy allergy'
            })
            .expect(400)
            .then(({ body }) => {
              expect(body.msg).toBe('Bad Request');
            });
        });
      });
    });

    // Zak BRANCH OUT FOR EACH REQUEST!! DON'T WORK ON MASTER
    describe('/users', () => {
      describe('GET', () => {
        it('SUCCESS - Status 200 - responds with an array of all users', () => {
          return request(app)
            .get('/api/users')
            .expect(200)
            .then(({ body: { users } }) => {
              users.forEach(user => {
                expect(user).toEqual(
                  expect.objectContaining({
                    user_id: expect.any(Number),
                    email: expect.any(String),
                    first_name: expect.any(String),
                    last_name: expect.any(String),
                    role: expect.stringMatching(/Staff|Admin/)
                  })
                );
              });
            });
        });
      });

      describe('DELETE', () => {
        it('SUCCESS - Status 204 - responds with no content status code after deleting', () => {
          return request(app).delete('/api/users/1').expect(204);
        });

        it('ERROR Status 404 - responds with an error message if no user was found', () => {
          return request(app)
            .delete('/api/users/747')
            .expect(404)
            .then(({ body: { msg } }) => {
              expect(msg).toBe('No user found for user id: 747');
            });
        });
      });

      describe('POST', () => {
        it('SUCCESS - Status 201 - responds with the posted user', () => {
          return request(app)
            .post('/api/users')
            .send({
              email: 'waiterwalter@tabletracker.com',
              first_name: 'wal',
              last_name: 'ter',
              role: 'Staff'
            })
            .then(({ body: { user } }) => {
              expect(user).toEqual(
                expect.objectContaining({
                  user_id: expect.any(Number),
                  email: expect.any(String),
                  first_name: expect.any(String),
                  last_name: expect.any(String),
                  role: expect.stringMatching(/Staff|Admin/)
                })
              );
            });
        });

        it('ERROR status 400 - responds with a bad request error message when a value is missing ', () => {
          return request(app)
            .post('/api/users')
            .send({
              email: 'waiterwalter@tabletracker.com',
              first_name: 'wal',
              last_name: 'ter'
            })
            .expect(400)
            .then(({ body: { msg } }) => {
              expect(msg).toEqual('Bad Request');
            });
        });

        it('ERROR status 400 - responds with a bad request error message when role is not set to Staff or Admin ', () => {
          return request(app)
            .post('/api/users')
            .send({
              email: 'waiterwalter@tabletracker.com',
              first_name: 'wal',
              last_name: 'ter',
              role: 'Waiter'
            })
            .expect(400)
            .then(({ body: { msg } }) => {
              expect(msg).toEqual('Bad Request');
            });
        });
      });
    });
  });
});
