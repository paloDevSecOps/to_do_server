import * as configcat from 'configcat-node';
import env from './env';

const logger = configcat.createConsoleLogger(configcat.LogLevel.Info);

const configCatClient = configcat.getClient(env().configCatSDK,
  configcat.PollingMode.AutoPoll,
  {
    logger: logger
  });