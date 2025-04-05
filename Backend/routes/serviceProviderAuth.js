const express = require('express');
const router = express.Router();
const {
  registerServiceProvider,
  loginServiceProvider
} = require('../controllers/authController');
const { protect } = require('../middlewear/authMiddleware');
const { ServiceProvider } = require('../models');

// Register service provider
router.post('/register', registerServiceProvider);

// Login service provider
router.post('/login', loginServiceProvider);

// Protected route (profile)
router.get('/profile', protect(ServiceProvider), (req, res) => {
  res.json(req.user);
});

module.exports = router;
