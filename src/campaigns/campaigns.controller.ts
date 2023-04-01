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
import { CreateCampaignDto } from './dto/create-campaign.dto';
import { FirebaseGuard, RolesGuard } from 'src/auth/guard';
import { Roles } from 'src/auth/decorator';
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

  @Get(':id')
  @ApiOperation({ summary: 'Get campaign details based on ID' })
  @ApiOkResponse({ description: 'Campaign details fetched successfully' })
  findOne(@Param('id', ParseIntPipe) campaignId: number) {
    return this.campaignsService.findOne(campaignId);
  }

  @Get('my')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get all campaigns made by the user' })
  @ApiOkResponse({ description: 'Campaigns fetched successfully' })
  findMy() {
    return 'This action returns all campaigns made by the user';
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
  update(@Param('id') id: string) {
    return `This action updates a #${id} campaign`;
  }

  @Delete(':id')
  @Roles(Role.Admin)
  @UseGuards(FirebaseGuard, RolesGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete a campaign' })
  delete(@Param('id') id: string) {
    return `This action deletes a #${id} campaign`;
  }
}
