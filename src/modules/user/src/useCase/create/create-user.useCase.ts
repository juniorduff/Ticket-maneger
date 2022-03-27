import { CreateUserDto } from '../../Swagger/dto/create-user.dto';
import { Inject, Injectable } from '@nestjs/common';
import { IUserRepositoryAdapter } from '../../infra/implementation/user.repository.adapter';
import { UserRepository } from '../../infra/repository/user.repository';
import { User } from '@prisma/client/index';
@Injectable()
class CreateUserUseCase {
  constructor(
    @Inject(UserRepository)
    private readonly userRepository: IUserRepositoryAdapter,
  ) {}

  execute(userDTO: CreateUserDto): Promise<User> {
    console.log(userDTO);
    return this.userRepository.create(userDTO);
  }
}

export { CreateUserUseCase };
