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
    //error method not valid
    it('ERROR - status 405 - method not allowed', () => {});

    describe('GET all orders', () => {
      // sucess returns all order
      xit('SUCCESS - status 200 - returns a new order', () => {});
    });
  });

  describe('/api/tables', () => {
    describe('/api/tables/:table_id/orders', () => {
      describe('POST order by table_id', () => {
        // sucess returns new order
        xit('SUCCESS - status 201 - returns a new order', () => {});
        // error table does not exist
        xit('ERROR - status 404 - ', () => {});
        // error one or more food items do not exist
        xit('', () => {});
        // bad request body missing required field x
        xit('', () => {});
        // bad request body missing multiple required fields
        xit('', () => {});
        // bad request?
        xit('', () => {});
      });
    });
  });

  describe('/api/users', () => {});
});
