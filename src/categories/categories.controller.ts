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
import { CategoriesService } from './categories.service';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { FirebaseGuard, RolesGuard } from 'src/auth/guard';
import { Roles } from 'src/auth/decorator';
import { Role } from 'src/auth/role.enum';
import { CreateCategoryDto, EditCategoryDto } from './dto';

@ApiTags('Categories')
@Controller('categories')
export class CategoriesController {
  constructor(private catgService: CategoriesService) {}

  @Get('all')
  @Roles(Role.Admin, Role.SuperAdmin)
  @UseGuards(FirebaseGuard, RolesGuard)
  @ApiBearerAuth()
  findAll() {
    return this.catgService.findAll();
  }

  @Post('')
  @Roles(Role.SuperAdmin)
  @UseGuards(FirebaseGuard, RolesGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a category' })
  create(@Body() dto: CreateCategoryDto) {
    return this.catgService.create(dto);
  }

  @Put(':id')
  @Roles(Role.SuperAdmin)
  @UseGuards(FirebaseGuard, RolesGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update a category' })
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: EditCategoryDto) {
    return this.catgService.update(id, dto);
  }

  @Delete(':id')
  @Roles(Role.SuperAdmin)
  @UseGuards(FirebaseGuard, RolesGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete a category' })
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.catgService.delete(id);
  }
}
