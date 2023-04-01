import { Controller, Get, UseGuards } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { FirebaseGuard, RolesGuard } from 'src/auth/guard';
import { Roles } from 'src/auth/decorator';
import { Role } from 'src/auth/role.enum';

@ApiTags('Categories')
@Controller('categories')
export class CategoriesController {
  constructor(private catService: CategoriesService) {}

  @Get('all')
  @Roles(Role.Admin, Role.SuperAdmin)
  @UseGuards(FirebaseGuard, RolesGuard)
  @ApiBearerAuth()
  findAll() {
    return this.catService.findAll();
  }
}
