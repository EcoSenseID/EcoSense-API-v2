import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { FirebaseGuard, RolesGuard } from 'src/auth/guard';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { GetUser, Roles } from 'src/auth/decorator';
import { Role } from 'src/auth/role.enum';

@ApiTags('Notification')
@Controller('notifications')
export class NotificationController {
  constructor(private service: NotificationService) {}

  @Get()
  @Roles(Role.User)
  @UseGuards(FirebaseGuard, RolesGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get all notifications for this user ID' })
  find(@GetUser('id') userId = 1, @Query('language') lang?: string) {
    return this.service.getNotifications(userId, lang);
  }
}
