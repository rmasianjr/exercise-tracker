const User = require('../models/User');

exports.createUser = async (req, res) => {
  const { username } = req.body;

  const user = await User.findOne({ username });

  if (user) {
    const error = new Error('username already taken');
    error.status = 400;
    throw error;
  }

  const newUser = new User({ username });
  await newUser.save();

  const { username: name, _id } = newUser;
  res.send({ username: name, _id });
};

exports.addExercise = async (req, res) => {
  const { userId, description, duration, date } = req.body;
  const user = await User.findById(userId);

  if (!user) {
    return res.status(404).send({ error: 'No user found in the given id' });
  }

  const exercise = date
    ? { description, duration, date }
    : { description, duration };

  user.log.push(exercise);
  await user.save();

  const log = user.log[user.log.length - 1];

  res.send({
    username: user.username,
    description: log.description,
    duration: log.duration,
    _id: user._id,
    date: log.date.toDateString()
  });
};
