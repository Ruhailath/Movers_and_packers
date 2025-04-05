const express = require('express');
const router = express.Router();
const {
  registerAdmin,
  loginAdmin
} = require('../controllers/authController');
const { protect, authorizeRole } = require('../middlewear/authMiddleware');
const { Admin } = require('../models');

// Register admin
router.post('/register', registerAdmin);

// Login admin
router.post('/login', loginAdmin);

// Protected route (admin only)
router.get('/dashboard', protect(Admin), authorizeRole('role', 'admin'), (req, res) => {
  res.json({ msg: `Welcome, ${req.user.name}` });
});

module.exports = router;
