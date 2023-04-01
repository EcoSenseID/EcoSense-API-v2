import { Controller, Get } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('Categories')
@Controller('categories')
export class CategoriesController {
  constructor(private catService: CategoriesService) {}

  @Get('all')
  @ApiBearerAuth()
  findAll() {
    return this.catService.findAll();
  }
}
