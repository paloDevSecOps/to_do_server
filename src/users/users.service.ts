import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm/dist/common/typeorm.decorators';
import { Repository } from 'typeorm/repository/Repository';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  createUser(createUserDto: CreateUserDto): Promise<CreateUserDto & User> {
    return this.usersRepository.save(createUserDto);
  }

  getAllUsers(): Promise<User[]> {
    return this.usersRepository.find();
  }

  getUser(id: number): Promise<User[]> {
    return this.usersRepository.find({ where: { id } });
  }

  async removeUser(id: number): Promise<void> {
    await this.usersRepository.delete(id);
  }
}
