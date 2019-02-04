const mongoose = require('mongoose');

module.exports = (req, res, next) => {
  const { userId } = req.query;

  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).send({ error: 'Invalid id' });
  }

  next();
};
