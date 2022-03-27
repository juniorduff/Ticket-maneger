import { CreateUserDto } from '../../Swagger/dto/create-user.dto';
import { ConflictException, Inject, Injectable } from '@nestjs/common';
import { IUserRepositoryAdapter } from '../../infra/implementation/user.repository.adapter';
import { UserRepository } from '../../infra/repository/user.repository';
import { User } from '@prisma/client/index';
@Injectable()
class CreateUserUseCase {
  constructor(
    @Inject(UserRepository)
    private readonly userRepository: IUserRepositoryAdapter,
  ) {}

  async execute(userDTO: CreateUserDto): Promise<User> {
    const { email } = userDTO;
    const user = await this.userRepository.findIfAlreadyExistsEmail(email);

    if (user) {
      throw new ConflictException(`Email already exists`);
    }

    return this.userRepository.create(userDTO);
  }
}

export { CreateUserUseCase };
