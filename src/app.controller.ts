import { Controller, Get } from '@nestjs/common';

@Controller('')
export class AppController {
  @Get()
  home() {
    return {
      status: 'success',
      info: 'Welcome to EcoSense API! This API is built using TypeScript, Node.js, Express and PostgreSQL.',
      contributors: {
        names: [
          'Darren Ngoh',
          'Mirsa Salsabila',
          'Deddy Romnan Rumapea',
          'Rivano Ardiyan Taufiq Kurniawan',
          'Kenrick Tandrian',
          'Kenji Marwies',
          'Hafizh Salam',
          'Alexander Putra',
          'Dhea Irdiana Faresha',
        ],
        team: 'EcoSense Indonesia',
        host: 'Universitas Indonesia',
      },
      version: '2.0.0',
      copyright: '2023 © EcoSense Indonesia. All Rights Reserved.',
    };
  }
}
