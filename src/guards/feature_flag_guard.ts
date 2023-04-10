import {
  CanActivate,
  ExecutionContext,
  HttpStatus,
  Injectable,
  Type,
  mixin,
} from '@nestjs/common';
import { ConfigCatService } from 'src/config/config_cat_service';

function featureFlagGuard(featureFlagName: string): Type<CanActivate> {
  @Injectable()
  class Guard implements CanActivate {
    constructor(private readonly configCatService: ConfigCatService) {}

    async canActivate(context: ExecutionContext) {
      const isEnabled = await this.configCatService.getFeatureFlagStatus(
        featureFlagName,
      );
      if (!isEnabled) {
        const httpContext = context.switchToHttp();
        const response = httpContext.getResponse();
        throw response
          .status(HttpStatus.I_AM_A_TEAPOT)
          .send(`This feature is not ready`);
      }
      return true;
    }
  }

  return mixin(Guard);
}

export default featureFlagGuard;
