import {} from '../delete/delete-user.useCase';
import { Controller, Delete, Get, Inject, Param } from '@nestjs/common';
import { IUserRepositoryAdapter } from '../../infra/implementation/user.repository.adapter';
import { UserRepository } from '../../infra/repository/user.repository';
import { FindUserUseCase } from './find-user.useCase';
import { User } from '@prisma/client';

@Controller('user')
class FindUserController {
  constructor(
    private readonly findUserUseCase: FindUserUseCase,
    @Inject(UserRepository)
    private readonly userRepository: IUserRepositoryAdapter,
  ) {}

  @Get(':user_id')
  async handle(@Param('user_id') user_id: string): Promise<User> {
    return this.findUserUseCase.execute({ user_id });
  }
}

export { FindUserController };
