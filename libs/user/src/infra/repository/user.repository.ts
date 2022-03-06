import { IUserRepositoryImplementation } from 'User/user/infra/implementation/user.repository.implementation';
import { PrismaService } from '../../../../../src/prisma.service';
import { User } from '@prisma/client';
import { hashSync } from 'bcrypt';
import { CreateUserDto } from 'User/user/Swagger/dto/create-user.dto';
import { BadRequestException, Injectable } from '@nestjs/common';
@Injectable()
class UserRepository implements IUserRepositoryImplementation {
  constructor(private readonly prisma: PrismaService) {}

  async create(user: CreateUserDto): Promise<User> {
    console.log(user);

    return this.prisma.user
      .create({
        data: {
          cpf: user.cpf,
          age: user.age,
          email: user.email,
          weight: user.weight,
          date_of_birth: user.date_of_birth,
          password: hashSync(user.password, 8),
          goal: user.goal,
          permission: user.permission,
          restriction: user.restriction,
          created_at: user.created_at,
        },
      })
      .catch((error) => {
        throw new BadRequestException(error.message);
      });
  }

  async delete(user_id: string): Promise<void> {
    this.prisma.user.delete({ where: { id: user_id } }).catch((error) => {
      throw new BadRequestException(error.message);
    });
  }

  async findOne(user_id: string): Promise<User> {
    return this.prisma.user.findUnique({ where: { id: user_id } });
  }
}
export { UserRepository };
