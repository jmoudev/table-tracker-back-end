exports.handleRouteNotFound = (req, res, next) => {
  return Promise.reject({ status: 404, msg: 'Not Found' });
};

exports.handleBadRequest = (req, res, next) => {
  return Promise.reject({ status: 400, msg: 'Bad Request' });
};

exports.handleMethodNotAllowed = (req, res, next) => {
  return Promise.reject({ status: 405, msg: 'Method Not Allowed' });
};

exports.handleCustomErrors = (err, req, res, next) => {
  if (err.status && err.msg) {
    res.status(err.status).send({ msg: err.msg });
  } else next(err);
};

exports.handlePSQLErrors = (err, req, res, next) => {
  console.log(err);
  if (err.code === '22P02' || '23502') {
    res.status(400).send({ msg: 'Bad Request' });
  } else if (err.code === '23503') {
    res.status(404).send({ msg: 'Not Found' });
  } else next(err);
};

exports.handleServerErrors = (err, req, res, next) => {
  res.status(500).send({ msg: 'Internal Server Error' });
};
