exports.notFound = (req, res, next) => {
  const error = new Error('Not Found');
  error.status = 404;
  next(error);
};

exports.errors = (err, req, res, next) => {
  console.log(err.message, err);

  res
    .status(err.status || 500)
    .send({ error: err.message || 'Internal Server Error' });
};
