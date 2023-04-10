import * as configcat from 'configcat-node';
import env from 'src/config/env';

export class ConfigCatService {
  private logger = configcat.createConsoleLogger(configcat.LogLevel.Info);

  private readonly configCatClient = configcat.getClient(
    env.configCatSDK,
    configcat.PollingMode.AutoPoll,
    {
      logger: this.logger,
    },
  );

  async getFeatureFlagStatus(flagName: string): Promise<boolean> {
    return this.configCatClient.getValueAsync(flagName, false);
  }
}
