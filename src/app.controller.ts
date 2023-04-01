import { Controller, Get } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { INFO } from './helpers';

@Controller('')
export class AppController {
  @Get()
  @ApiOperation({ summary: 'General information' })
  home() {
    return INFO;
  }
}
