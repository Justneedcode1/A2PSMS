import express from 'express';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Simple in-memory database (for now)
const users = {};

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'healthy', message: 'Backend is running!' });
});

app.listen(PORT, () => {
  console.log(`✓ Backend running on port ${PORT}`);
});
