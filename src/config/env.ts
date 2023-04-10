import { config } from 'dotenv';

config();

export default init();

function init(): {
  host: string;
  port: string;
  database: {
    host: string;
    port: number;
    user: string;
    password: string;
    database: string;
  };
  configCatSDK: string;
} {
  return {
    host: ensureEnv('HOST'),
    port: ensureEnv('PORT'),
    database: {
      host: ensureEnv('POSTGRES_HOST'),
      port: parseInt(ensureEnv('POSTGRES_PORT'), 10),
      user: ensureEnv('POSTGRES_USER'),
      password: ensureEnv('POSTGRES_PASSWORD'),
      database: ensureEnv('POSTGRES_DB'),
    },
    configCatSDK: ensureEnv('CONFIG_CAT_SDK_KEY'),
  };
}

function ensureEnv(key: string): string {
  const value = process.env[key];
  if (value) return value;
  else throw new Error(`Missing env variable [${key}]`);
}
