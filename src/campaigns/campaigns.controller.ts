import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { CampaignsService } from './campaigns.service';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('campaigns')
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
}
