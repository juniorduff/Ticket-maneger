import { Role, User } from '@prisma/client';
import { CreateUserDto } from '../Swagger/dto/create-user.dto';

export const mockNewUser = (): CreateUserDto => {
  const user = new CreateUserDto();
  user.name = 'test';
  user.email = 'teste@teste';
  user.password = 'teste';
  user.age = 2;
  user.date_of_birth = new Date('2020-01-01');
  user.permission = Role.ADMIN;
  return user;
};
