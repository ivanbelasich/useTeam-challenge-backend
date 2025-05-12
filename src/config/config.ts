import { ConfigProps } from '../interfaces/config.interfaces';

export const config = (): ConfigProps => ({
  port: parseInt(process.env.PORT ?? '4000'),
  api: {
    apiUrl: process.env.API_URL ?? 'http://localhost:4000',
    httpTimeout: 1000,
  },
  mongodb: {
    database: {
      connectionString:
        process.env.MONGODB_URI ?? 'mongodb://localhost:27017/kanban',
      databaseName: 'kanban',
    },
  },
});
