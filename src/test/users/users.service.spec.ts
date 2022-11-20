import { UsersService } from './../../users/users.service';
import { User } from './../../users/entities/user.entity';
import { mockAllUsers, mockUser1 } from "./mock";
import { TestingModule, Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';



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
            createUser: jest.fn().mockResolvedValue(mockUser1),
            getAllUsers: jest.fn().mockResolvedValue(mockAllUsers),
            getUser: jest.fn().mockResolvedValue(mockUser1),
            removeUser: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    repository = module.get<Repository<User>>(getRepositoryToken(User));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
