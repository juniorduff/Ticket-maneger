import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { IUserRepositoryAdapter } from '../../infra/implementation/user.repository.adapter';
import { UserRepository } from '../../infra/repository/user.repository';
type Request = {
  user_id: string;
};
@Injectable()
class DeleteUserUseCase {
  constructor(
    @Inject(UserRepository)
    private readonly userRepository: IUserRepositoryAdapter,
  ) {}
  async execute({ user_id }: Request): Promise<void> {
    const user = await this.userRepository.findById(user_id);
    console.log(user);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    await this.userRepository.delete(user_id);
  }
}

export { DeleteUserUseCase };
