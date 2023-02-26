import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  createUser(
    @Body() createUserDto: CreateUserDto,
  ): Promise<CreateUserDto & User> {
    return this.usersService.createUser(createUserDto);
  }

  @Get()
  getAllUsers(): Promise<User[]> {
    return this.usersService.getAllUsers();
  }

  @Get(':id')
  getUser(@Param('id') id: string): Promise<User[]> {
    return this.usersService.getUser(+id);
  }
  @Delete(':id')
  removeUser(@Param('id') id: string): Promise<void> {
    return this.usersService.removeUser(+id);
  }
}
