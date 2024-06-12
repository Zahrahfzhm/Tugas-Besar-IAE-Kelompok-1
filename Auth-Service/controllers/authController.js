const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const users = require('../models/user');
const keys = require('../config/keys');

exports.register = async (req, res) => {
  const { username, password } = req.body;

  const userExists = users.find(user => user.username === username);
  if (userExists) {
    return res.status(400).json({ msg: 'User already exists' });
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  users.push({ username, password: hashedPassword });

  res.status(201).json({ msg: 'User registered' });
};

exports.login = async (req, res) => {
    const { username, password } = req.body;
  
    const user = users.find(user => user.username === username);
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }
  
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }
  
    const payload = { username: user.username };
  
    const accessToken = jwt.sign(payload, keys.secretOrKey, { expiresIn: '15s' });
    const refreshToken = jwt.sign(payload, keys.secretOrKey, { expiresIn: '7d' });
  
    user.refreshToken = refreshToken;
  
    res.json({ accessToken, refreshToken });
  };
  

exports.logout = (req, res) => {
  // Logout logic can be handled client-side by destroying the token.
  res.json({ msg: 'User logged out' });
};
