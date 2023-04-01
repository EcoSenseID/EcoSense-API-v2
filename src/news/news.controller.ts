import { Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { NewsService } from './news.service';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('News')
@Controller('news')
export class NewsController {
  constructor(private newsService: NewsService) {}

  @Get('all')
  @ApiOperation({ summary: 'Get all news' })
  @ApiOkResponse({
    description: 'News fetched successfully',
    isArray: true,
  })
  findAll() {
    return this.newsService.findAll();
  }

  @Post('')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a news' })
  create() {
    return 'This action adds a new news';
  }

  @Put(':id')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update a news' })
  update(@Param('id') id: string) {
    return `This action updates a #${id} news`;
  }

  @Delete(':id')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete a news' })
  delete(@Param('id') id: string) {
    return `This action deletes a #${id} news`;
  }
}
