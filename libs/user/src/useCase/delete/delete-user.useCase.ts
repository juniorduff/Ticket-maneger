import { Inject, Injectable } from '@nestjs/common';
import { IUserRepositoryImplementation } from 'User/user/infra/implementation/user.repository.implementation';
import { UserRepository } from 'User/user/infra/repository/user.repository';
type Request = {
  user_id: string;
};
@Injectable()
class DeleteUserUseCase {
  constructor(
    @Inject(UserRepository)
    private readonly userRepository: IUserRepositoryImplementation,
  ) {}
  execute({ user_id }: Request) {
    return this.userRepository.delete(user_id);
  }
}

export { DeleteUserUseCase };
