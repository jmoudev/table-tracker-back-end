const request = require('supertest');

process.env.NODE_ENV = 'test';

const connection = require('../db/connection');

const app = require('../app');

describe('/api', () => {
  afterAll(() => connection.destroy());
  beforeEach(() => connection.seed.run());
  // Ayako BRANCH OUT FOR EACH REQUEST!! DON'T WORK ON MASTER
  describe('/foodItems', () => {
    it('GET 200 - responds with an array of all users', () => {
      return request(app).get('/api/food-items').expect(200);
    });
  });
  //Joe BRANCH OUT FOR EACH REQUEST!! DON'T WORK ON MASTER
  describe('/orders', () => {});
  //Joe BRANCH OUT FOR EACH REQUEST!! DON'T WORK ON MASTER
  describe('/tables', () => {});
  // Zak BRANCH OUT FOR EACH REQUEST!! DON'T WORK ON MASTER
  describe('/users', () => {
    describe('GET', () => {
      it('SUCCESS - Status 200 - responds with an array of all users', () => {
        return request(app)
          .get('/api/users')
          .expect(200)
          .then(({ body: { users } }) => {
            users.forEach((user) => {
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
  });
});
