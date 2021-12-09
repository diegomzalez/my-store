require('dotenv').config();
const config = {
  env: process.env.NODE_ENV || 'dev',
  port: process.env.NODE_PORT || 3500,
  dbUser: process.env.DB_USER,
  dbPassword: process.env.DB_PASSWORD,
  dbHost: process.env.DB_HOST,
  dbName: process.env.DB_NAME,
  dbPort: process.env.DB_PORT,
  dbUrl: 'postgres://${DB_USER}:${DB_PASSWORD}@${config.dbHost}:${config.dbPort}/${config.dbName}'
};

module.exports = { config };
