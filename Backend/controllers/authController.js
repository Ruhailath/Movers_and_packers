const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { Client, ServiceProvider, Admin } = require('../models');
require('dotenv').config();

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || '1d'
  });
};

// --- CLIENT ---
exports.registerClient = async (req, res) => {
  const { name, email, password, phone, address } = req.body;
  try {
    let user = await Client.findOne({ email });
    if (user) return res.status(400).json({ msg: 'Client already exists' });

    const hashed = await bcrypt.hash(password, 10);
    user = await Client.create({ name, email, password: hashed, phone, address });

    const token = generateToken(user._id);
    res.status(201).json({ user, token });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

exports.loginClient = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await Client.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    const token = generateToken(user._id);
    res.status(200).json({ user, token });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// --- SERVICE PROVIDER ---
exports.registerServiceProvider = async (req, res) => {
  const { name, email, password, phone, serviceType, location } = req.body;
  try {
    let user = await ServiceProvider.findOne({ email });
    if (user) return res.status(400).json({ msg: 'Service Provider already exists' });

    const hashed = await bcrypt.hash(password, 10);
    user = await ServiceProvider.create({ name, email, password: hashed, phone, serviceType, location });

    const token = generateToken(user._id);
    res.status(201).json({ user, token });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

exports.loginServiceProvider = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await ServiceProvider.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    const token = generateToken(user._id);
    res.status(200).json({ user, token });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// --- ADMIN ---
exports.registerAdmin = async (req, res) => {
  const { name, email, password, role } = req.body;
  try {
    let admin = await Admin.findOne({ email });
    if (admin) return res.status(400).json({ msg: 'Admin already exists' });

    const hashed = await bcrypt.hash(password, 10);
    admin = await Admin.create({ name, email, password: hashed, role: role || 'admin' });

    const token = generateToken(admin._id);
    res.status(201).json({ admin, token });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

exports.loginAdmin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const admin = await Admin.findOne({ email });
    if (!admin || !(await bcrypt.compare(password, admin.password))) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    const token = generateToken(admin._id);
    res.status(200).json({ admin, token });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};
