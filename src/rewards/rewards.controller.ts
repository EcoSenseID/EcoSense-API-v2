import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { RewardsService } from './rewards.service';
import { CreateRewardDto, EditRewardDto } from './dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { Roles } from 'src/auth/decorator';
import { FirebaseGuard, RolesGuard } from 'src/auth/guard';
import { Role } from 'src/auth/role.enum';

@ApiTags('Rewards')
@Controller('')
export class RewardsController {
  constructor(private rewardsService: RewardsService) {}

  @Get('donations')
  @ApiOperation({ summary: 'Get all donations' })
  findAllDonations() {
    return this.rewardsService.findAllDonations();
  }

  @Get('donations/:id')
  @ApiOperation({ summary: 'Get donation details based on ID' })
  findOneDonation(@Param('id', ParseIntPipe) rewardId: number) {
    return this.rewardsService.findOneDonation(rewardId);
  }

  @Get('rewards/all')
  @Roles(Role.SuperAdmin)
  @UseGuards(FirebaseGuard, RolesGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get all rewards' })
  findAll() {
    return this.rewardsService.findAll();
  }

  @Post('rewards')
  @Roles(Role.SuperAdmin)
  @UseGuards(FirebaseGuard, RolesGuard)
  @UseInterceptors(FileInterceptor('uploadPoster'))
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a reward' })
  create(
    @Body() dto: CreateRewardDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.rewardsService.create(dto, file);
  }

  @Put('rewards/:id')
  @Roles(Role.SuperAdmin)
  @UseGuards(FirebaseGuard, RolesGuard)
  @UseInterceptors(FileInterceptor('uploadPoster'))
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update a reward' })
  update(
    @Param('id', ParseIntPipe) rewardId: number,
    @Body() dto: EditRewardDto,
    @Body() posterChanged: boolean,
    @UploadedFile() file?: Express.Multer.File,
  ) {
    return this.rewardsService.update(rewardId, dto, posterChanged, file);
  }

  @Delete('rewards/:id')
  @Roles(Role.SuperAdmin)
  @UseGuards(FirebaseGuard, RolesGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete a reward' })
  delete(@Param('id', ParseIntPipe) rewardId: number) {
    return this.rewardsService.delete(rewardId);
  }
}
