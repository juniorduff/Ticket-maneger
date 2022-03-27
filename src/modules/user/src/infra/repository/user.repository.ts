import { IUserRepositoryAdapter } from '../implementation/user.repository.adapter';
import { PrismaService } from '../../../../../prisma.service';
import { User } from '@prisma/client';
import { hashSync } from 'bcrypt';
import { CreateUserDto } from '../../Swagger/dto/create-user.dto';
import { BadRequestException, Injectable } from '@nestjs/common';

@Injectable()
class UserRepository implements IUserRepositoryAdapter {
  constructor(private readonly prisma: PrismaService) {}
  private userRepository = this.prisma.user;
  async create(user: CreateUserDto): Promise<User> {
    return this.userRepository
      .create({
        data: {
          ...user,
          password: hashSync(user.password, 10),
        },
      })
      .catch((err) => {
        throw new BadRequestException(err.message);
      });
  }
  async findIfAlreadyExistsEmail(email: string): Promise<User> {
    return this.userRepository
      .findUnique({
        where: {
          email,
        },
      })
      .catch((err) => {
        throw new BadRequestException(err.message);
      });
  }

  async delete(user_id: string): Promise<void> {
    this.userRepository.delete({ where: { id: user_id } }).catch((error) => {
      throw new BadRequestException(error.message);
    });
  }

  async findById(user_id: string): Promise<User> {
    return this.userRepository.findUnique({ where: { id: user_id } });
  }
}
export { UserRepository };
