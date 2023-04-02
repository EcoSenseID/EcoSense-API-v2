import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { RewardCategoriesService } from './reward-categories.service';
import { Roles } from 'src/auth/decorator';
import { Role } from 'src/auth/role.enum';
import { FirebaseGuard, RolesGuard } from 'src/auth/guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CreateRewardCategoryDto, UpdateRewardCategoryDto } from './dto';

@ApiTags('Reward Categories')
@Controller('rewardCatgs')
export class RewardCategoriesController {
  constructor(private service: RewardCategoriesService) {}

  @Get()
  @Roles(Role.SuperAdmin)
  @UseGuards(FirebaseGuard, RolesGuard)
  @ApiBearerAuth()
  findAll() {
    return this.service.findAll();
  }

  @Post()
  @Roles(Role.SuperAdmin)
  @UseGuards(FirebaseGuard, RolesGuard)
  @ApiBearerAuth()
  create(@Body() dto: CreateRewardCategoryDto) {
    return this.service.create(dto);
  }

  @Put(':id')
  @Roles(Role.SuperAdmin)
  @UseGuards(FirebaseGuard, RolesGuard)
  @ApiBearerAuth()
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateRewardCategoryDto,
  ) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  @Roles(Role.SuperAdmin)
  @UseGuards(FirebaseGuard, RolesGuard)
  @ApiBearerAuth()
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.service.delete(id);
  }
}
