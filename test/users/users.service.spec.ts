import { getRepositoryToken } from "@nestjs/typeorm";
import { Test } from '@nestjs/testing/test';
import { Repository } from 'typeorm/repository/Repository';
import { allUsers, user1 } from './mock';
import { TestingModule } from '@nestjs/testing';
import { User } from "src/users/entities/user.entity";
import { UsersService } from "src/users/users.service";


describe('UsersService', () => {
  let service: UsersService;
  let repository: Repository<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useValue: {
            createUser: jest.fn().mockResolvedValue(user1),
            getAllUsers: jest.fn().mockResolvedValue(allUsers),
            getUser: jest.fn().mockResolvedValue(user1),
            removeUser: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    repository = module.get<Repository<User>>(getRepositoryToken(User));
  });

  it('should be defined', () => {
    console.log('testing');
    expect(service).toBeDefined();
  });
});
