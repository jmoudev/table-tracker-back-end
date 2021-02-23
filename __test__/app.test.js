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
    it('SUCCESS POST 201 - adds a food item to food_items table', () => {
      return request(app)
      .post('/api/food-items')
      .send({ name: 'Pina Colada', price: 8.00, course: 'drinks'})
      .expect(201)
      .then(({ body }) => {
        expect(body.foodItems.name).toBe('Pina Colada')
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
