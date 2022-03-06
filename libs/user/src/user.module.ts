import { Module } from '@nestjs/common';
import { CreateUserController } from 'User/user/useCase/create/create-user.controller';
import { CreateUserUseCase } from 'User/user/useCase/create/create-user.useCase';
import { UserRepository } from 'User/user/infra/repository/user.repository';
import { PrismaService } from '../../../src/prisma.service';
import { FindUserUseCase } from 'User/user/useCase/find/find-user.useCase';
import { DeleteUserUseCase } from 'User/user/useCase/delete/delete-user.useCase';
import { FindUserController } from 'User/user/useCase/find/find-user.controller';
import { DeleteUserController } from './useCase/delete/delete-user.controller';

@Module({
  providers: [
    CreateUserUseCase,
    FindUserUseCase,
    DeleteUserUseCase,
    UserRepository,
    PrismaService,
  ],
  controllers: [CreateUserController, DeleteUserController, FindUserController],
  exports: [],
})
export class UserModule {}
