const User = require('./user.model');
const bcrypt = require('bcryptjs');

module.exports.check = async (req, res, next) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    throw Error('User not found.');
  }

  next();
};

module.exports.create = async (req, res) => {
  const user = new User(req.body);
  user.date = Date.now();
  user.password = bcrypt.hashSync(user.password, 10);
  await user.save();

  res.json(user);
};

module.exports.remove = async (req, res) => {
  await User.findByIdAndRemove(req.params.id);

  res.json(req.params.id);
};

module.exports.list = async (req, res) => {
  const user = new User(req.body);
  const query = {};
  if (user.name) {
    query.name = user.name
  }
  if (user.hobby) {
    query.hobby = user.hobby
  }
  const users = await User.find(query);

  res.json(users);
};

module.exports.report = async (req, res) => {
  const query = {
    age: {$gt:18}, 
    sex: 'Masculino',
    date: {"$gt" : new Date(new Date().setDate(new Date().getDate()-3))}
  };
  const users = await User.find(query);

  res.json(users);
};