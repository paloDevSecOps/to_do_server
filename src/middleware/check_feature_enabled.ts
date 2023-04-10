import { Request, Response, NextFunction } from 'express';
import { configCatClient } from 'src/config/config_cat';

export function checkFeatureEnabled(flagName: string) {
  return async (req: Request, res: Response, next: NextFunction) => {
    const FeatureFlagEnabled = await configCatClient.getValueAsync(
      flagName,
      false,
    );

    console.log(`${flagName}:  ${FeatureFlagEnabled}`);

    if (FeatureFlagEnabled) next();
    else return res.status(418).send(`This feature is not ready`);
  };
}
