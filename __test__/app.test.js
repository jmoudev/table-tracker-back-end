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
    it('GET 200 - responds with an array of all users', () => {
      return request(app)
        .get('/api/users')
        .expect(200)
        .then(({ body: { users } }) => {
          expect(users).toEqual([
            {
              email: 'harryp@gmail.com',
              first_name: 'Harry',
              last_name: 'Potter',
              role: 'Staff',
              user_id: 1
            },
            {
              email: 'ronw@gmail.com',
              first_name: 'Ron',
              last_name: 'Weasley',
              role: 'Staff',
              user_id: 2
            },
            {
              email: 'hermioneg@gmail.com',
              first_name: 'Hermione',
              last_name: 'Grainger',
              role: 'Staff',
              user_id: 3
            },
            {
              email: 'albusd@gmail.com',
              first_name: 'Albus',
              last_name: 'Dumbledore',
              role: 'Staff',
              user_id: 4
            },
            {
              email: 'joem@gmail.com',
              first_name: 'Joe',
              last_name: 'Mould',
              role: 'Staff',
              user_id: 5
            },
            {
              email: 'zakp@gmail.com',
              first_name: 'Zak',
              last_name: 'Patel',
              role: 'Admin',
              user_id: 6
            },
            {
              email: 'mela@gmail.com',
              first_name: 'Melissa',
              last_name: 'Astbury',
              role: 'Admin',
              user_id: 7
            },
            {
              email: 'mela@gmail.com',
              first_name: 'Melissa',
              last_name: 'Astbury',
              role: 'Admin',
              user_id: 8
            },
            {
              email: 'mela@gmail.com',
              first_name: 'Melissa',
              last_name: 'Astbury',
              first_name: 'Ayako',
              last_name: 'Bland',
              role: 'Admin',
              user_id: 9
            },
            {
              email: 'lchap@gmail.com',
              first_name: 'Lew',
              last_name: 'Chapman',
              role: 'Admin',
              user_id: 10
            }
          ]);
        });
    });
  });
});
