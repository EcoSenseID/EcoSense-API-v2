import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/auth/decorator';
import { FirebaseGuard, RolesGuard } from 'src/auth/guard';
import { Role } from 'src/auth/role.enum';
import { UsersService } from './users.service';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}
  @Get('all')
  @Roles(Role.SuperAdmin)
  @UseGuards(FirebaseGuard, RolesGuard)
  @ApiBearerAuth()
  findAll() {
    return this.userService.getAllUsers();
  }
}
