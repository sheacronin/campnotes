import dotenv from 'dotenv';
dotenv.config();
import express, { Application, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import './config/passport';

import charactersRouter from './routes/characters';
import usersRouter from './routes/users';
import campaignRouter from './routes/campaigns';

const app: Application = express();

app.use(cors({ origin: true, credentials: true }));
app.use(cookieParser());
app.use(express.json());

app.use('/characters', charactersRouter);
app.use('/users', usersRouter);
app.use('/campaigns', campaignRouter);
app.get('/', (req: Request, res: Response, next: NextFunction) => {
  res.send('Hello');
});

app.listen(5000, () => console.log('Server running'));
