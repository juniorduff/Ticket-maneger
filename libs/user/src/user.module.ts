import { Module } from '@nestjs/common';
import { CreateUserController } from 'User/user/useCase/create/create-user.controller';
import { CreateUserUseCase } from 'User/user/useCase/create/create-user.useCase';
import { UserRepository } from 'User/user/infra/repository/user.repository';
import { PrismaService } from '../../../src/prisma.service';

@Module({
  providers: [CreateUserUseCase, UserRepository, PrismaService],
  controllers: [CreateUserController],
  exports: [],
})
export class UserModule {}
