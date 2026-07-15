import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './src/routes/auth.routes';
import chatRoutes from './src/routes/chat.routes';

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

app.use(cors({ origin: ['http://localhost:3000', 'https://quizzo-teacher-assistant.netlify.app'] }));
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/chat', chatRoutes);

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
