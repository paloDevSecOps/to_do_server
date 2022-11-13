import { config } from 'dotenv'

config()

export default ()=>({
  host: ensureEnv('HOST'),
  port: ensureEnv('PORT'),
  database: {
    host: ensureEnv('POSTGRES_HOST'),
    port: parseInt(ensureEnv('POSTGRES_PORT'), 10),
    user: ensureEnv('POSTGRES_USER'),
    password: ensureEnv('POSTGRES_PASSWORD'),
    database: ensureEnv('POSTGRES_DB'),
  },
});

function ensureEnv(key: string) {
  const value = process.env[key];
  console.log(key, ":", value);
  if (value) return value;
  else throw new Error(`Missing env variable [${key}]`);
}
