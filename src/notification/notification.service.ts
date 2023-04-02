import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import {
  NotificationContent,
  NotificationObject,
  NotificationType,
} from './notification.enum';
import { convertToUnixTimestamp } from 'src/helpers';

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

  async getNotifications(userId: number, lang = 'id') {
    try {
      const userList = await this.prisma.user.findMany();
      const replyList = await this.prisma.reply.findMany();
      const rewardList = await this.prisma.reward.findMany();
      const campaignList = await this.prisma.campaign.findMany();
      return {
        error: false,
        message: 'Fetch notifications success!',
        notifications: await this.prisma.notification
          .findMany({
            where: { id_target_user: userId, deleted_at: null },
            orderBy: { timestamp: 'desc' },
          })
          .then((notifications) =>
            notifications.map((notif) => {
              const notifContent = NotificationContent[notif.type];
              let icon = '';
              let contentId = '';
              let contentEn = '';
              let deeplink = '';
              if (notif.type === NotificationType.SUPPORT_STORY) {
                // object = story
                const supportUser = userList.find(
                  (user) => user.id === notif.id_sender_user,
                );
                if (supportUser) {
                  icon = notifContent.icon(supportUser);
                  contentEn = notifContent.contentEn(supportUser);
                  contentId = notifContent.contentId(supportUser);
                }
                deeplink = notifContent.deeplink(notif.object_id);
              } else if (
                notif.type === NotificationType.SUPPORT_REPLY ||
                notif.type === NotificationType.REPLY_STORY
              ) {
                // object = reply
                const sender = userList.find(
                  (user) => user.id === notif.id_sender_user,
                );
                const reply = replyList.find(
                  (reply) => reply.id === notif.object_id,
                );
                if (!!sender && !!reply) {
                  icon = notifContent.icon(sender);
                  contentEn = notifContent.contentEn(sender, reply);
                  contentId = notifContent.contentId(sender, reply);
                  deeplink = notifContent.deeplink(reply.id_story);
                }
              } else if (
                notif.type === NotificationType.REWARD_SENT ||
                notif.type === NotificationType.DONATION_SENT
              ) {
                // object = reward or donation
                const reward = rewardList.find(
                  (reward) => reward.id === notif.object_id,
                );
                if (reward) icon = notifContent.icon(reward);
                contentEn = notifContent.contentEn();
                contentId = notifContent.contentId();
                deeplink = notifContent.deeplink(notif.object_id);
              } else if (
                notif.type === NotificationType.CAMPAIGN_APPROVAL ||
                notif.type === NotificationType.CAMPAIGN_REJECTED ||
                notif.type === NotificationType.CAMPAIGN_ENDING_SOON
              ) {
                // object = campaign
                const campaign = campaignList.find(
                  (campaign) => campaign.id === notif.object_id,
                );
                if (campaign) {
                  icon = notifContent.icon(campaign);
                  contentEn = notifContent.contentEn(campaign);
                  contentId = notifContent.contentId(campaign);
                }
                deeplink = notifContent.deeplink(notif.object_id);
              }
              return {
                id: notif.id,
                timestamp: convertToUnixTimestamp(notif.timestamp),
                content: lang === 'id' ? contentId : contentEn,
                iconUrl: icon,
                deeplink: deeplink,
              };
            }),
          ),
      };
    } catch (error) {
      throw new HttpException(
        { error: true, message: error.message },
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
