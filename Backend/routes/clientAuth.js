const express = require('express');
const router = express.Router();
const { registerClient, loginClient } = require('../controllers/authController');
const { protect } = require('../middlewear/authMiddleware');
const { Client } = require('../models');

router.post('/register', registerClient);
router.post('/login', loginClient);

// Protected route
router.get('/profile', protect(Client), (req, res) => {
  res.json(req.user);
});

module.exports = router;
