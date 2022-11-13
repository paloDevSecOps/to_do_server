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

  createUser(createUserDto: CreateUserDto) {
    return this.usersRepository.save(createUserDto);
  }

  getAllUsers() {
    return this.usersRepository.find();
  }

  getUser(id: number) {
    return this.usersRepository.find({ where: { id } });
  }

  async removeUser(id: number) {
    await this.usersRepository.delete(id);
  }
}
