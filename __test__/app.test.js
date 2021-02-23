const request = require('supertest');

process.env.NODE_ENV = 'test';

const connection = require('../db/connection');

const app = require('../app');

describe('/api', () => {
  afterAll(() => connection.destroy());
  beforeEach(() => connection.seed.run());

  describe('/api/foodItems', () => {
    it('GET 200 - responds with an array of all users', () => {
      return request(app).get('/api/food-items').expect(200);
    });
  });

  describe('/api/orders', () => {
    it('ERROR - status 405 - method not allowed', () => {});

    describe('GET all orders', () => {
      xit('SUCCESS - status 200 - returns array of all orders', () => {});
    });
  });

  describe('/api/tables', () => {
    describe('/api/tables', () => {
      describe('GET all tables', () => {
        xit('SUCCESS - status 200 - returns all tables', () => {});
        xit('SUCCESS - status 200 - returns array of tables with is_active query filtering based on whether the table is currently active', () => {});
        xit('ERROR - status 400 - bad request on is_active query', () => {});
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
  });

  describe('/api/users', () => {});
});
