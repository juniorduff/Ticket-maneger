import { Module } from '@nestjs/common';
import { CreateUserController } from './src/useCase/create/create-user.controller';
import { FindUserController } from './src/useCase/find/find-user.controller';
import { DeleteUserController } from './src/useCase/delete/delete-user.controller';
import { CreateUserUseCase } from './src/useCase/create/create-user.useCase';
import { FindUserUseCase } from './src/useCase/find/find-user.useCase';
import { DeleteUserUseCase } from './src/useCase/delete/delete-user.useCase';
import { UserRepository } from './src/infra/repository/user.repository';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../../prisma.service';

@Module({
  controllers: [CreateUserController, FindUserController, DeleteUserController],
  providers: [
    UserRepository,
    CreateUserUseCase,
    FindUserUseCase,
    DeleteUserUseCase,
    PrismaService,
  ],
  exports: [UserModule],
})
export class UserModule {}
