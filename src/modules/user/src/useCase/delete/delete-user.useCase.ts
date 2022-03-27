import { Inject, Injectable } from '@nestjs/common';
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
  execute({ user_id }: Request) {
    return this.userRepository.delete(user_id);
  }
}

export { DeleteUserUseCase };
