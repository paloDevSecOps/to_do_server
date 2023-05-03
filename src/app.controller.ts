import { Controller, Get } from '@nestjs/common';
import env from './config/env';

@Controller('/')
export class AppController {
  @Get()
  getAllUsers(): string {
    return `${env.host}:${env.port}`;
  }
}
