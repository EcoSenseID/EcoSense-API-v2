import { Controller, Get, UseGuards } from '@nestjs/common';
import { RewardCategoriesService } from './reward-categories.service';
import { Roles } from 'src/auth/decorator';
import { Role } from 'src/auth/role.enum';
import { FirebaseGuard, RolesGuard } from 'src/auth/guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('Reward Categories')
@Controller('reward-categories')
export class RewardCategoriesController {
  constructor(private service: RewardCategoriesService) {}

  @Get()
  @Roles(Role.SuperAdmin)
  @UseGuards(FirebaseGuard, RolesGuard)
  @ApiBearerAuth()
  findAll() {
    return this.service.findAll();
  }
}
