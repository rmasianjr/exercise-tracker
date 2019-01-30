const User = require('../models/User');

exports.createUser = async (req, res) => {
  const { username } = req.body;

  const user = await User.findOne({ username });

  if (user) {
    throw new Error('username already taken');
  }

  const newUser = new User({ username });
  await newUser.save();

  const { username: name, _id } = newUser;
  res.send({ username: name, _id });
};
