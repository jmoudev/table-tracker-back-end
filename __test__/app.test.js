const request = require('supertest');

process.env.NODE_ENV = 'test';

const connection = require('../db/connection');

const app = require('../app');

describe('/api', () => {
  afterAll(() => connection.destroy());
  beforeEach(() => connection.seed.run());

  // Ayako BRANCH OUT FOR EACH REQUEST!! DON'T WORK ON MASTER
  describe('/food-items', () => {
    it('GET 200 - responds with an array of all food_items', () => {
      return request(app)
        .get('/api/food-items')
        .expect(200)
        .then(({ body }) => {
          expect(body.foodItems).toHaveLength(21);
        });
    });
  });

  describe('/api/orders', () => {
    it('ERROR - status 405 - method not allowed', () => {});

    describe('GET all orders', () => {
      xit('SUCCESS - status 200 - returns array of all orders', () => {});
      // by table query
      xit('SUCCESS - status 200 - returns array of all orders', () => {});
    });
  });
  describe('/api/tables', () => {
    it('ERROR - status 405 - method not allowed', () => {
      return request(app)
        .put('/api/tables')
        .expect(405)
        .then(({ body }) => {
          expect(body.msg).toBe('Method Not Allowed');
        });
    });
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
            body.msg.toBe('Bad Request');
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
      it('SUCCESS - status 201 - returns a new order', () => {
        return request(app).post('/api/tales/1/orders').send({
          table_id: ''

          // not seeidng any data
          // should be seeding data
        });
      });
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
