import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { dataSource } from './config/db';
import { PostsModule } from './posts/posts.module';
import { AppController } from './app.controller';

@Module({
  imports: [TypeOrmModule.forRoot(dataSource), UsersModule, PostsModule],
  controllers: [AppController],
})
export class AppModule {}
