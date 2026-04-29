import express from 'express';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

const users = {};

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'healthy', message: 'Backend running!' });
});

// Register
app.post('/api/v1/auth/register', (req, res) => {
  const { email, password, firstName, lastName } = req.body;
  
  if (!email || !password || !firstName || !lastName) {
    return res.status(400).json({ success: false, message: 'All fields required' });
  }
  
  if (users[email]) {
    return res.status(400).json({ success: false, message: 'Email already exists' });
  }
  
  users[email] = { email, password, firstName, lastName };
  
  res.json({ 
    success: true, 
    token: 'token_' + Date.now(),
    user: { email, firstName, lastName }
  });
});

// Login
app.post('/api/v1/auth/login', (req, res) => {
  const { email, password } = req.body;
  
  if (!email || !password) {
    return res.status(400).json({ success: false, message: 'Email and password required' });
  }
  
  const user = users[email];
  
  if (!user || user.password !== password) {
    return res.status(401).json({ success: false, message: 'Invalid credentials' });
  }
  
  res.json({ 
    success: true, 
    token: 'token_' + Date.now(),
    user: { email, firstName: user.firstName, lastName: user.lastName }
  });
});

app.listen(PORT, () => {
  console.log(`✓ Backend running on port ${PORT}`);
});
