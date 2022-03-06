import { CreateUserDto } from 'User/user/Swagger/dto/create-user.dto';
import { Inject, Injectable } from '@nestjs/common';
import { IUserRepositoryImplementation } from 'User/user/infra/implementation/user.repository.implementation';
import { UserRepository } from 'User/user/infra/repository/user.repository';
import { User } from '@prisma/client/index';
@Injectable()
class CreateUserUseCase {
  constructor(
    @Inject(UserRepository)
    private readonly userRepository: IUserRepositoryImplementation,
  ) {}

  execute(userDTO: CreateUserDto): Promise<User> {
    console.log(userDTO);
    return this.userRepository.create(userDTO);
  }
}

export { CreateUserUseCase };
