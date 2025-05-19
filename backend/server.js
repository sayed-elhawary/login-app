require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true, useUnifiedTopology: true
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// User model
const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true},
  password: { type: String, required: true}
});

const User = mongoose.model('User', UserSchema);

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Register route
app.post('/api/register', async (req, res) => {
  const { username, password } = req.body;
  if(!username || !password) return res.status(400).json({ msg: 'Please enter all fields' });

  const userExist = await User.findOne({ username });
  if(userExist) return res.status(400).json({ msg: 'User already exists' });

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const newUser = new User({ username, password: hashedPassword });
  await newUser.save();

  res.json({ msg: 'User registered successfully' });
});

// Login route
app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;
  if(!username || !password) return res.status(400).json({ msg: 'Please enter all fields' });

  const user = await User.findOne({ username });
  if(!user) return res.status(400).json({ msg: 'Invalid credentials' });

  const isMatch = await bcrypt.compare(password, user.password);
  if(!isMatch) return res.status(400).json({ msg: 'Invalid credentials' });

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
  res.json({ token, username: user.username });
});

// Middleware to verify token
const auth = (req, res, next) => {
  const token = req.header('x-auth-token');
  if(!token) return res.status(401).json({ msg: 'No token, authorization denied' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch {
    res.status(401).json({ msg: 'Token is not valid' });
  }
};

// Protected Dashboard route
app.get('/api/dashboard', auth, (req, res) => {
  res.json({ msg: `Welcome to your dashboard, user ${req.user.id}` });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

