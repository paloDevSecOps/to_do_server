import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { ConfigCatService } from 'src/config/config_cat_service';

@Module({
  controllers: [PostsController],
  providers: [PostsService, ConfigCatService]
})
export class PostsModule {}
