const jwt = require('jsonwebtoken');
const { Client, ServiceProvider, Admin } = require('../models');
require('dotenv').config();

// Authentication middleware
exports.protect = (model) => async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await model.findById(decoded.id).select('-password');
      next();
    } catch (err) {
      return res.status(401).json({ msg: 'Not authorized, token failed' });
    }
  }

  if (!token) return res.status(401).json({ msg: 'No token provided' });
};

// Authorization middleware
exports.authorizeRole = (roleKey, expectedRole) => async (req, res, next) => {
  if (req.user?.[roleKey] !== expectedRole && req.user?.role !== expectedRole) {
    return res.status(403).json({ msg: 'Access denied' });
  }
  next();
};
