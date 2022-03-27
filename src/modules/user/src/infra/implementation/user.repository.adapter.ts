import { User } from '@prisma/client';
import { CreateUserDto } from '../../Swagger/dto/create-user.dto';

interface IUserRepositoryAdapter {
  create(user: CreateUserDto): Promise<User>;
  findById(user_id: string): Promise<User>;
  findIfAlreadyExistsEmail(email: string): Promise<User>;
  delete(user_id: string): Promise<void>;
}
export { IUserRepositoryAdapter };
