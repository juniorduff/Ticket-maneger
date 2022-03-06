import { Module } from '@nestjs/common';
import { UserModule } from 'User/user';
import { PrismaService } from './prisma.service';

@Module({
  imports: [UserModule],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule {}
