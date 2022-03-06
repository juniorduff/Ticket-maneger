import {} from 'User/user/useCase/delete/delete-user.useCase';
import { Controller, Delete, Get, Inject, Param } from '@nestjs/common';
import { IUserRepositoryImplementation } from 'User/user/infra/implementation/user.repository.implementation';
import { UserRepository } from 'User/user/infra/repository/user.repository';
import { FindUserUseCase } from 'User/user/useCase/find/find-user.useCase';
import { User } from '@prisma/client';
import { ApiParam } from '@nestjs/swagger';

@Controller('user')
class FindUserController {
  constructor(
    private readonly findUserUseCase: FindUserUseCase,
    @Inject(UserRepository)
    private readonly userRepository: IUserRepositoryImplementation,
  ) {}

  @Get(':user_id')
  async handle(@Param('user_id') user_id: string): Promise<User> {
    return this.findUserUseCase.execute({ user_id });
  }
}

export { FindUserController };
