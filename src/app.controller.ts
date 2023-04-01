import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { INFO } from './helpers';

@ApiTags('Home')
@Controller('')
export class AppController {
  @Get()
  @ApiOperation({ summary: 'General information' })
  home() {
    return INFO;
  }
}
