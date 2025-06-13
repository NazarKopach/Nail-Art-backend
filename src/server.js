import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import { getEnvVar } from './utils/getEnvVar.js';
import { notFoundHandler } from './middlewares/not FoundHandler.js';
import { errorHandler } from './middlewares/errorHandler.js';
import { logger } from './middlewares/logger.js';

import authRoutes from './routes/auth.js';
import bookingRouters from './routes/booking.js';

export const startServer = () => {
  const app = express();

  app.use(cors());
  app.use(express.json());
  app.use(cookieParser());
  // app.use(logger);

  app.use('/auth', authRoutes);

  app.use('/bookings', bookingRouters);

  app.use(notFoundHandler);

  app.use(errorHandler);

  const port = Number(getEnvVar('PORT', 3000));

  app.listen(port, () => console.log(`Server is runing on ${port} port`));
};
