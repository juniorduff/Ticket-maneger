import { Injectable } from '@nestjs/common';
import { IUserRepositoryImplementation } from 'User/user/infra/implementation/user.repository.implementation';
type Request = {
  user_id: string;
};
@Injectable()
class DeleteUserUseCase {
  constructor(private readonly userRepository: IUserRepositoryImplementation) {}
  execute({ user_id }: Request) {
    return this.userRepository.delete();
  }
}

export { DeleteUserUseCase };
