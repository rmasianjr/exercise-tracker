exports.notFound = (req, res, next) => {
  const error = new Error('Not Found');
  error.status = 404;
  next(error);
};

exports.errors = (err, req, res, next) => {
  console.log(err.message, err);
  let errCode, errMessage;

  if (err.errors) {
    const keys = Object.keys(err.errors);
    errCode = 400;
    errMessage = err.errors[keys[0]].message;
  } else {
    errCode = err.status || 500;
    errMessage = err.message || 'Internal Server Error';
  }

  res.status(errCode).send({ error: errMessage });
};
