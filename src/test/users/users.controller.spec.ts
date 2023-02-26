import { mockAllUsers, mockUser1 } from './mock';
import { TestingModule, Test } from '@nestjs/testing';
import { UsersController } from './../../users/users.controller';
import { CreateUserDto } from './../../users/dto/create-user.dto';
import { UsersService } from './../../users/users.service';

describe('UsersController', () => {
  let usersController: UsersController;
  let usersService: UsersService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        UsersService,
        {
          provide: UsersService,
          useValue: {
            create: jest
              .fn()
              .mockImplementation((user: CreateUserDto) =>
                Promise.resolve({ ...user }),
              ),
            findAll: jest.fn().mockResolvedValue(mockAllUsers),
            findOne: jest
              .fn()
              .mockImplementation(() => Promise.resolve(mockUser1)),
            remove: jest.fn(),
          },
        },
      ],
    }).compile();

    usersController = app.get<UsersController>(UsersController);
    usersService = app.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(usersController).toBeDefined();
    expect(usersService).toBeDefined();
  });
});
