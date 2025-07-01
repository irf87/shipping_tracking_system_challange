const { config } = require('dotenv');
const { resolve } = require('path');
const { execSync } = require('child_process');

module.exports = async () => {
  config({ path: resolve(__dirname, '.env.test') });
  // Push Prisma schema to SQLite in-memory DB
  execSync('npx prisma db push', { stdio: 'inherit' });
}; 