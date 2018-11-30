require('dotenv').config();

const axios = require('axios');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const { authenticate } = require('./middlewares');

const db = require('../database/dbConfig.js');

module.exports = server => {
  server.get('/api/users', getUsers);
  server.post('/api/register', register);
  server.post('/api/login', login);
  server.get('/api/jokes', authenticate, getJokes);
};

function register(req, res) {
  // implement user registration
  const creds = req.body;
  const hash = bcrypt.hashSync(creds.password, 14);
  creds.password = hash;

  db('users')
    .insert(creds)
    .then(id => {
      res.status(201).json({ id: id[0] })
    })
    .catch(err => {
      if (err.errno === 19) {
        res.status(409).json({ message: 'Username already exists' });
      } else {
        res.status(500).json({ message: 'Error registering user' });
      }
    })
}

function getUsers(req, res) {
  db('users')
    .then(users => {
      res.status(200).json(users);
    })
    .catch(err => {
      res.status(500).json({ message: 'Error retrieving users'});
    });
}

function login(req, res) {
  // implement user login
  const creds = req.body;

  db('users')
    .where({ username: creds.username })
    .first()
    .then(user => {
      if(user && bcrypt.compareSync(creds.password, user.password)) {
        const token = generateToken(user);
        res.status(200).json({ message: 'Successful login', token });
      } else {
        res.status(401).json({ message: 'Failed login' });
      }
    })
    .catch(err => {
      res.status(500).json({ message: 'Error occurred during login', err });
    });
}

function getJokes(req, res) {
  axios
    .get(
      'https://08ad1pao69.execute-api.us-east-1.amazonaws.com/dev/random_ten'
    )
    .then(response => {
      res.status(200).json(response.data);
    })
    .catch(err => {
      res.status(500).json({ message: 'Error Fetching Jokes', error: err });
    });
}

// generates json web token
const generateToken = user => {
  const payload = {
    subject: user.id,
    username: user.username
  };

  const secret = process.env.JWT_SECRET;

  const options = {
    expiresIn: '1h',
  };

  return jwt.sign(payload, secret, options);
}