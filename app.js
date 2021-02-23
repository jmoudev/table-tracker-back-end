const express = require('express');
const {
  handleRouteNotFound,
  handleCustomErrors,
  handlePSQLErrors,
  handleServerErrors
} = require('./controllers/errors.controllers');
const app = express();
const apiRouter = require('./routers/api.router');

app.use('/api', apiRouter);

app.all('/*', handleRouteNotFound);

app.use(handleCustomErrors);
app.use(handlePSQLErrors);
app.use(handleServerErrors);

module.exports = app;
