import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import env from './config/env';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { UsersController } from './users/users.controller';
import { UsersService } from './users/users.service';
import { postgresConfig } from './config/db';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal:true,
      load: [env],
    }),
    TypeOrmModule.forRoot(postgresConfig),
    UsersModule,
  ],
  controllers: [AppController, UsersController],
  providers: [AppService, UsersService],
})
export class AppModule {}
