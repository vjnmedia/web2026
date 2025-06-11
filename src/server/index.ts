import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import volunteerRouter from './api/volunteer';
import path from 'path';
import uploadRouter from './routes/upload';

// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/volunteer', volunteerRouter);
app.use('/api/upload', uploadRouter);

// Serve uploads directory statically
app.use('/uploads', express.static(path.join(__dirname, '../../uploads')));

// Error handling middleware
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
}); 