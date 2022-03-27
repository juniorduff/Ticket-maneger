import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { IUserRepositoryAdapter } from '../../infra/implementation/user.repository.adapter';
import { User } from '@prisma/client';
import { UserRepository } from '../../infra/repository/user.repository';
type Request = {
  user_id: string;
};
@Injectable()
class FindUserUseCase {
  constructor(
    @Inject(UserRepository)
    private readonly userRepository: IUserRepositoryAdapter,
  ) {}
  async execute({ user_id }: Request): Promise<User> {
    const user = await this.userRepository.findById(user_id);

    if (!user) {
      throw new NotFoundException('user is not found');
    }
    return user;
  }
}

export { FindUserUseCase };
