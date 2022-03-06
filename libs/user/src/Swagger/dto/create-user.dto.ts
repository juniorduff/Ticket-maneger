import { Role, Prisma } from '@prisma/client';
import { Decimal } from '@prisma/client/runtime';
import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { IsDate, IsDecimal, IsEnum, IsNumber, IsString } from 'class-validator';

class CreateUserDto implements Prisma.UserCreateInput {
  @ApiHideProperty()
  id: string;
  @ApiProperty()
  email: string;
  @ApiProperty()
  name: string;
  @ApiProperty()
  @IsString()
  cpf: string;
  @IsNumber()
  @ApiProperty()
  age: number;
  @ApiProperty({ example: 56 })
  @IsNumber()
  weight: Decimal;
  @ApiProperty()
  @IsString()
  password: string;
  @ApiProperty()
  @IsString()
  restriction: string;
  @ApiProperty()
  @IsString()
  goal: string;
  @ApiProperty({ example: new Date() })
  date_of_birth: Date;
  @ApiHideProperty()
  created_at: Date;
  @ApiHideProperty()
  updated_at: Date;
  @ApiProperty({ example: 'ALUNO' })
  @IsEnum(Role)
  permission: Role;
}
export { CreateUserDto };
