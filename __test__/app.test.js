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
        expect(body.foodItems).toHaveLength(21)
      })
    })
  })
  describe('POST /api/food-items', () => {
    it('SUCCESS status 201 - adds a food item to food_items table', () => {
      return request(app)
      .post('/api/food-items')
      .send({ name: 'Pina Colada', price: 8.00, course: 'drinks'})
      .expect(201)
      .then(({ body }) => {
        expect(body.foodItems.name).toBe('Pina Colada')
      })
    })
    it('ERROR status 400 - returns an error when a string is passed for price ', () => {
      return request(app)
      .post('/api/food-items')
      .send({ name: 'Pina Colada', price: 'eight pounds', course: 'drinks'})
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toEqual('Bad Request');
      });
    })
    it('ERROR status 400 - returns an error when a value is missing ', () => {
      return request(app)
      .post('/api/food-items')
      .send({ name: '', price: 8.00, course: 'drinks'})
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toEqual('Bad Request');
      });
    })
  })
  //Joe BRANCH OUT FOR EACH REQUEST!! DON'T WORK ON MASTER
  describe('/api/orders', () => {
    it('ERROR - status 405 - method not allowed', () => {});

    describe('GET all orders', () => {
      xit('SUCCESS - status 200 - returns array of all orders', () => {});
      // by table query
      xit('SUCCESS - status 200 - returns array of all orders', () => {});
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
                    is_active: expect.any(Boolean)
                  })
                );
              });
            });
        });
        it('SUCCESS - status 200 - returns array of tables with is_active query filtering based on whether the table is currently active', () => {
          return request(app)
            .get('/api/tables?is_active=true')
            .expect(200)
            .then(({ body }) => {
              expect(body.tables).toHaveLength(1);
              body.tables.forEach(table => {
                expect(table).toEqual(
                  expect.objectContaining({
                    is_active: true
                  })
                );
              });
            });
        });
        it('ERROR - status 400 - bad request on is_active query', () => {
          return request(app)
            .get('/api/tables?is_active=not-a-query')
            .expect(400)
            .then(({ body }) => {
              expect(body.msg).toEqual('Bad Request');
            });
        });
      });
    });
  });

  describe('/api/tables/:table_id/orders', () => {
    describe('PATCH order by table_id', () => {
      xit('SUCCESS - status 200 - return specified order with updated food-items', () => {});
      xit('SUCCESS - status 200 - no information in request body does not update order', () => {});
      xit('ERROR - status 404 - table does not exist', () => {});
      xit('ERROR - status 404 - bad request on table_id', () => {});
      xit('ERROR - status 404 - bad request body incorrect type', () => {});
    });

    describe('POST order by table_id', () => {
      xit('SUCCESS - status 201 - returns a new order', () => {});
      xit('ERROR - status 404 - table does not exist', () => {});
      xit('ERROR - status 400 - bad request on table_id', () => {});
      xit('ERROR - status 400 - bad request body missing required field', () => {});
      xit('ERROR - status 400 - bad request body missing multiple required fields', () => {});
      xit('ERROR - status 400 - bad request food-item not valid', () => {});
    });
  });
  // Zak BRANCH OUT FOR EACH REQUEST!! DON'T WORK ON MASTER
  describe('/users', () => {});
});

