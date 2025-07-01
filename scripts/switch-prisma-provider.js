const { readFileSync, writeFileSync } = require('fs');
const { resolve } = require('path');

const schemaPath = resolve(__dirname, '../prisma/schema.prisma');
const env = process.env.NODE_ENV;
console.log('env', env);

const provider = env === 'test' ? 'sqlite' : 'postgresql';

let schema = readFileSync(schemaPath, 'utf-8');

schema = schema.replace(
  /provider\s*=\s*"(sqlite|postgresql)"/g,
  `provider = "${provider}"`
);

writeFileSync(schemaPath, schema, 'utf-8');

console.log(`Prisma provider set to '${provider}' for NODE_ENV=${env}`); 