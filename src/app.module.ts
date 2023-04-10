import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { dataSource } from './config/db';
import { PostsModule } from './posts/posts.module';
import { checkFeatureEnabled } from './middleware/check_feature_enabled';
import { PostsController } from './posts/posts.controller';

@Module({
  imports: [TypeOrmModule.forRoot(dataSource), UsersModule, PostsModule,],
 })
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(checkFeatureEnabled('postFeatureFlagEnabled'))
      .forRoutes(PostsController);
  }
}
