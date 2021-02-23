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
        expect(body.foodItems).toHaveLength(21)
      })
    })
  })
  //Joe BRANCH OUT FOR EACH REQUEST!! DON'T WORK ON MASTER
  describe('/orders', () => {});
  //Joe BRANCH OUT FOR EACH REQUEST!! DON'T WORK ON MASTER
  describe('/tables', () => {});
  // Zak BRANCH OUT FOR EACH REQUEST!! DON'T WORK ON MASTER
  describe('/users', () => {});
});
