import { User } from '@prisma/client';
import { CreateUserDto } from 'User/user/Swagger/dto/create-user.dto';

interface IUserRepositoryImplementation {
  create(user: CreateUserDto): Promise<User>;
  findOne(user_id: string): Promise<User>;

  delete(user_id: string): Promise<void>;
}
export { IUserRepositoryImplementation };
