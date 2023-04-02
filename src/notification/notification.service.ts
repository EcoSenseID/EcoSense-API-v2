import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { NotificationObject, NotificationType } from './notification.enum';

@Injectable()
export class NotificationService {
  constructor(private prisma: PrismaService) {}

  async send(
    id_target_user: number,
    id_sender_user: number,
    type: NotificationType,
    object: NotificationObject,
    object_id: number,
  ) {
    try {
      const { id } = await this.prisma.notification.create({
        data: {
          id_target_user,
          id_sender_user,
          type,
          timestamp: new Date(),
          object,
          object_id,
        },
      });
      return {
        error: false,
        message: 'Notification sent!',
        notifId: id,
      };
    } catch (error) {
      return {
        error: true,
        message: error.message,
      };
    }
  }
}
