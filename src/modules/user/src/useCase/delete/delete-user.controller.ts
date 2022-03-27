import { DeleteUserUseCase } from './delete-user.useCase';
import { Controller, Delete, Inject, Injectable, Param } from '@nestjs/common';
import { IUserRepositoryAdapter } from '../../infra/implementation/user.repository.adapter';
import { UserRepository } from '../../infra/repository/user.repository';
import { ApiTags } from '@nestjs/swagger';
@ApiTags('User')
@Controller('user')
class DeleteUserController {
  constructor(
    private readonly deleteUserUseCase: DeleteUserUseCase,
    @Inject(UserRepository)
    private readonly userRepository: IUserRepositoryAdapter,
  ) {}

  @Delete('/:user_id')
  async handle(@Param() user_id: string): Promise<void> {
    return this.deleteUserUseCase.execute({ user_id });
  }
}
export { DeleteUserController };
