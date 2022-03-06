import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { CreateUserUseCase } from 'User/user/useCase/create/create-user.useCase';
import { CreateUserDto } from 'User/user/Swagger/dto/create-user.dto';
import { Response } from 'express';

@Controller('User')
class CreateUserController {
  constructor(private readonly createUserService: CreateUserUseCase) {}

  @Post()
  async handle(@Body() userDTO: CreateUserDto, @Res() response: Response) {
    const user = await this.createUserService.execute(userDTO);
    return response.status(HttpStatus.CREATED).json({ user });
  }
}

export { CreateUserController };
