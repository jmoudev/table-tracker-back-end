const ENV = process.env.NODE_ENV || 'development';

const baseConfig = {
  client: 'pg',
  migrations: {
    directory: './db/migrations',
  },
  seeds: {
    directory: './db/seeds',
  },
};

const customConfig = {
  development: {
    connection: {
      database: table_tracker_api,
    },
  },
};

module.exports = { ...customConfig[ENV], ...baseConfig };
