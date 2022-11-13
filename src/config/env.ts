export default ()=>({
  host: ensureEnv('HOST'),
  port: ensureEnv('PORT'),
  database: {
    host: ensureEnv('DATABASE_HOST'),
    port: parseInt(ensureEnv('DATABASE_PORT'), 10),
    user: ensureEnv('DATABASE_USER'),
    password: ensureEnv('DATABASE_PASSWORD'),
    database: ensureEnv('DATABASE_NAME'),
  },
});

function ensureEnv(key: string) {
  const value = process.env[`${key}`];
  if (value) return value;
  else throw new Error(`Missing env variable [${key}]`);
}
