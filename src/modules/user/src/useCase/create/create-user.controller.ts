import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { CreateUserUseCase } from './create-user.useCase';
import { CreateUserDto } from '../../Swagger/dto/create-user.dto';
import { Response } from 'express';
import { ApiTags } from '@nestjs/swagger';
@ApiTags('User')
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
