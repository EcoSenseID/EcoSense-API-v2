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
import { CampaignsService } from './campaigns.service';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { CreateCampaignDto } from './dto';
import { FirebaseGuard, RolesGuard } from 'src/auth/guard';
import { GetUser, Roles } from 'src/auth/decorator';
import { Role } from 'src/auth/role.enum';

@ApiTags('Campaigns')
@Controller('campaigns')
export class CampaignsController {
  constructor(private campaignsService: CampaignsService) {}

  @Get('all')
  @ApiOperation({ summary: 'Get all campaigns' })
  @ApiOkResponse({
    description: 'Campaigns fetched successfully',
    isArray: true,
  })
  findAll() {
    return this.campaignsService.findAll();
  }

  @Get('my')
  @Roles(Role.Admin)
  @UseGuards(FirebaseGuard, RolesGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get all campaigns made by the user' })
  @ApiOkResponse({ description: 'Campaigns fetched successfully' })
  findMy(@GetUser('id') userId: number) {
    return this.campaignsService.findMyCampaigns(userId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get campaign details based on ID' })
  @ApiOkResponse({ description: 'Campaign details fetched successfully' })
  findOne(@Param('id', ParseIntPipe) campaignId: number) {
    return this.campaignsService.findOne(campaignId);
  }

  @Post('')
  @Roles(Role.Admin)
  @UseGuards(FirebaseGuard, RolesGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a new campaign' })
  create(@Body() dto: CreateCampaignDto) {
    return this.campaignsService.createCampaign(0, dto);
  }

  @Put(':id')
  @Roles(Role.Admin)
  @UseGuards(FirebaseGuard, RolesGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update a campaign' })
  update(@Param('id', ParseIntPipe) id: number) {
    return `This action updates a #${id} campaign`;
  }

  @Delete(':id')
  @Roles(Role.Admin)
  @UseGuards(FirebaseGuard, RolesGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete a campaign' })
  delete(@Param('id', ParseIntPipe) id: number) {
    return `This action deletes a #${id} campaign`;
  }
}
