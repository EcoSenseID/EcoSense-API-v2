import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { RewardsService } from './rewards.service';
import { CreateRewardDto, EditRewardDto } from './dto';

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
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get all rewards' })
  findAll() {
    return this.rewardsService.findAll();
  }

  @Post('rewards')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a reward' })
  create(@Body() dto: CreateRewardDto) {
    return this.rewardsService.create(dto);
  }

  @Put('rewards/:id')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update a reward' })
  update(
    @Param('id', ParseIntPipe) rewardId: number,
    @Body() dto: EditRewardDto,
  ) {
    return this.rewardsService.update(rewardId, dto);
  }

  @Delete('rewards/:id')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete a reward' })
  delete(@Param('id', ParseIntPipe) rewardId: number) {
    return this.rewardsService.delete(rewardId);
  }
}
