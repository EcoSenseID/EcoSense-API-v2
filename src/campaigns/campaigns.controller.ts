import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { CampaignsService } from './campaigns.service';

@Controller('campaigns')
export class CampaignsController {
  constructor(private campaignsService: CampaignsService) {}

  @Get('all')
  getCampaigns() {
    return this.campaignsService.getCampaigns();
  }

  @Get(':id')
  getCampaignById(@Param('id', ParseIntPipe) campaignId: number) {
    return this.campaignsService.getCampaignById(campaignId);
  }
}
