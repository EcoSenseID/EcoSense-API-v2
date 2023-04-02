import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { AuthService } from 'src/auth/auth.service';

@Module({
  providers: [AuthService, UsersService],
  controllers: [UsersController],
})
export class UsersModule {}
