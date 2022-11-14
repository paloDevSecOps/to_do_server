import { User } from 'src/users/entities/user.entity';

export const allUsers: Array<User> = [
  {
    id: 1,
    username: 'testUser1',
    password: '1234',
  },
  {
    id: 2,
    username: 'testUser2',
    password: '1234',
  },
];

export const user1: User = { id: 3, username: 'testUser3', password: '1234' };
