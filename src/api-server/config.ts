// simple-node-mvc-starter-project ~~ MIT License
// Configuration

// Imports
import dotenv from 'dotenv';

// Types
export type Config = typeof config;

dotenv.config();

const config = {
   apiServer: {
      port: process.env.port || 2121,
      },
   db: {
      name:     'library.db',
      user:     process.env.dbUser,
      password: process.env.dbPassword,
      },
   };

export { config };
