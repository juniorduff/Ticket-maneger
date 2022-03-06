import { DeleteUserUseCase } from 'User/user/useCase/delete/delete-user.useCase';
import { Controller, Delete, Inject, Injectable, Param } from '@nestjs/common';
import { IUserRepositoryImplementation } from 'User/user/infra/implementation/user.repository.implementation';
import { UserRepository } from 'User/user/infra/repository/user.repository';
@Controller('user')
class DeleteUserController {
  constructor(
    private readonly deleteUserUseCase: DeleteUserUseCase,
    @Inject(UserRepository)
    private readonly userRepository: IUserRepositoryImplementation,
  ) {}

  @Delete(':user_id')
  async handle(@Param() user_id: string): Promise<void> {
    return this.deleteUserUseCase.execute({ user_id });
  }
}
export { DeleteUserController };
