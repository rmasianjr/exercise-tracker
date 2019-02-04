const { User } = require('../models/User');

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

function filterExercises(exercises, from, to, limit) {
  let filteredObj;

  function isValid(date) {
    return !isNaN(new Date(date).getTime());
  }

  if (from && to && isValid(from) && isValid(to)) {
    const logs = exercises.filter(ex => {
      const logDate = Date.parse(ex.date);
      return logDate > Date.parse(from) && logDate < Date.parse(to);
    });

    filteredObj = {
      from: new Date(from).toDateString(),
      to: new Date(to).toDateString(),
      log: logs
    };
  } else if (from && isValid(from)) {
    const logs = exercises.filter(ex => Date.parse(ex.date) > Date.parse(from));

    filteredObj = { from: new Date(from).toDateString(), log: logs };
  } else {
    filteredObj = { log: exercises };
  }

  filteredObj.log = !isNaN(Number(limit))
    ? filteredObj.log.slice(0, limit)
    : filteredObj.log;

  return filteredObj;
}

exports.getUserExercises = async (req, res) => {
  const { userId, from, to, limit } = req.query;

  let user = await User.findById(userId).select('-__v');

  if (!user) {
    return res.status(404).send({ error: 'No user found in the given id' });
  }

  user = user.toObject();
  user.log = user.log.sort((a, b) => b.date.getTime() - a.date.getTime());

  const resObj = Object.assign(
    {},
    user,
    filterExercises(user.log, from, to, limit)
  );

  resObj.count = resObj.log.length;
  resObj.log = resObj.log.map(exercise => {
    delete exercise._id;
    exercise.date = exercise.date.toDateString();
    return exercise;
  });

  res.send(resObj);
};
