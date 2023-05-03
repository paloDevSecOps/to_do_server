import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { User } from 'configcat-node';
import env from './env';

export const dataSource: TypeOrmModuleOptions = {
  type: 'postgres',
  host: env.database.host,
  port: env.database.port,
  username: env.database.user,
  password: env.database.password,
  database: env.database.database,
  synchronize: true,
  logging: false,
  entities: [User],
  subscribers: [],
  migrations: ['src/migrations/**/*{.ts,.js}'],
  migrationsTableName: 'migrations',
  autoLoadEntities: true,
};
