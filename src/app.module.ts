import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { dataSource } from './config/db';

@Module({
  imports: [TypeOrmModule.forRoot(dataSource), UsersModule],
})
export class AppModule {}
