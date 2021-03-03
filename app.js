const express = require('express');
const cors = require('cors');
const {
  handleRouteNotFound,
  handleCustomErrors,
  handlePSQLErrors,
  handleServerErrors,
} = require('./controllers/errors.controllers');
const apiRouter = require('./routers/api.router');
const app = express();

app.use(cors());
app.use(express.json());

app.use('/api', apiRouter);

app.all('/*', handleRouteNotFound);

app.use(handleCustomErrors);
app.use(handlePSQLErrors);
app.use(handleServerErrors);

module.exports = app;
