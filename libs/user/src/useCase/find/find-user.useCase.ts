import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { IUserRepositoryImplementation } from 'User/user/infra/implementation/user.repository.implementation';
import { User } from '@prisma/client';
import { UserRepository } from 'User/user/infra/repository/user.repository';
type Request = {
  user_id: string;
};
@Injectable()
class FindUserUseCase {
  constructor(
    @Inject(UserRepository)
    private readonly userRepository: IUserRepositoryImplementation,
  ) {}
  async execute({ user_id }: Request): Promise<User> {
    const user = await this.userRepository.findOne(user_id);

    if (!user) {
      throw new NotFoundException('user is not found');
    }
    return user;
  }
}

export { FindUserUseCase };
