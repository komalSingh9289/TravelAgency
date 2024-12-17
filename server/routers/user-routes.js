import express from 'express';
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import User from '../models/user-model.js';

const router = express.Router();

const JWT_SECRET = process.env.JWT_SECRET || "TRAVELAGENCY123456";


// Generate JWT Token
const generateToken = (user) => {
  return jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, { expiresIn: '1h' });
};

// Signup Route
router.post('/signup', async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const user = new User({ name, email, password, role });
    await user.save();

    const token = generateToken(user);
    res.status(201).json({ token, user: { id: user._id, name: user.name, role: user.role } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
});

// Login Route
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = generateToken(user);
    res.status(200).json({ token, user: { id: user._id, name: user.name, email:user.email, role: user.role } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
});

// Protect Route Middleware
const authMiddleware = (roles = []) => {
  return (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    try {
      const decoded = jwt.verify(token, JWT_SECRET);
      if (roles.length && !roles.includes(decoded.role)) {
        return res.status(403).json({ message: 'Forbidden' });
      }

      req.user = decoded;
      next();
    } catch (err) {
      console.error(err);
      res.status(401).json({ message: 'Unauthorized' });
    }
  };
};

// Example Protected Route
router.get('/admin', authMiddleware(['admin']), (req, res) => {
  res.status(200).json({ message: 'Welcome, Admin!' });
});

export default router;
