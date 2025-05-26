import { initMongoDB } from './db/intMongoDB.js';
import { startServer } from './server.js';

const bootstrap = async () => {
  await initMongoDB();
  startServer();
};

bootstrap();
