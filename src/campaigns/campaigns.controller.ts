import {
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { CampaignsService } from './campaigns.service';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

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
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a new campaign' })
  create() {
    return 'This action adds a new campaign';
  }

  @Put(':id')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update a campaign' })
  update(@Param('id') id: string) {
    return `This action updates a #${id} campaign`;
  }

  @Delete(':id')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete a campaign' })
  delete(@Param('id') id: string) {
    return `This action deletes a #${id} campaign`;
  }
}
