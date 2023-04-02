import { Campaign, Reply, Reward, User } from '@prisma/client';

export enum NotificationType {
  SUPPORT_STORY = 'support-story',
  SUPPORT_REPLY = 'support-reply',
  REPLY_STORY = 'reply-story',
  DONATION_SENT = 'donation-sent',
  REWARD_SENT = 'reward-sent',
  CAMPAIGN_APPROVAL = 'campaign-approval',
  CAMPAIGN_REJECTED = 'campaign-reject',
  CAMPAIGN_ENDING_SOON = 'campaign-ending-soon',
}

export enum NotificationObject {
  STORY = 'story',
  REPLY = 'reply',
  REWARD = 'reward',
  CAMPAIGN = 'campaign',
}

export const NotificationContent = {
  [NotificationType.SUPPORT_STORY]: {
    icon: (supporter: User) => supporter.profile_url,
    contentEn: (supporter: User) => `${supporter.name} supported your story.`,
    contentId: (supporter: User) => `${supporter.name} mendukung cerita Anda.`,
    deeplink: (id: number) => `https://ecosense.id/deeplinks/storydetail/${id}`,
  },
  [NotificationType.SUPPORT_REPLY]: {
    icon: (supporter: User) => supporter.profile_url,
    contentEn: (supporter: User, reply: Reply) =>
      `${supporter.name} liked your reply: ${reply.description}`,
    contentId: (supporter: User, reply: Reply) =>
      `${supporter.name} mendukung balasan Anda: ${reply.description}`,
    deeplink: (id: number) => `https://ecosense.id/deeplinks/storydetail/${id}`,
  },
  [NotificationType.REPLY_STORY]: {
    icon: (replyUser: User) => replyUser.profile_url,
    contentEn: (replyUser: User, reply: Reply) =>
      `${replyUser.name} replied to your story: ${reply.description}`,
    contentId: (replyUser: User, reply: Reply) =>
      `${replyUser.name} membalas cerita Anda: ${reply.description}`,
    deeplink: (id: number) => `https://ecosense.id/deeplinks/storydetail/${id}`,
  },
  [NotificationType.REWARD_SENT]: {
    icon: (reward: Reward) => reward.photo_url,
    contentEn: () => `Your reward has been processed. Check your email!`,
    contentId: () => `Rewardmu sudah selesai diproses. Silakan cek email ya!`,
    deeplink: (id: number) =>
      `https://ecosense.id/deeplinks/rewarddetail/${id}`,
  },
  [NotificationType.DONATION_SENT]: {
    icon: (donation: Reward) => donation.photo_url,
    contentEn: () => `Thank you for donating!`,
    contentId: () => `Terima kasih sudah berdonasi!`,
    deeplink: (id: number) =>
      `https://ecosense.id/deeplinks/rewarddetail/${id}`,
  },
  [NotificationType.CAMPAIGN_APPROVAL]: {
    icon: (campaign: Campaign) => campaign.poster_url,
    contentEn: (campaign: Campaign) =>
      `${campaign.title} campaign has been approved by the team`,
    contentId: (campaign: Campaign) =>
      `Kampanye ${campaign.title} sudah disetujui oleh tim!`,
    deeplink: (id: number) =>
      `https://ecosense.id/deeplinks/campaigndetail/${id}`,
  },
  [NotificationType.CAMPAIGN_REJECTED]: {
    icon: (campaign: Campaign) => campaign.poster_url,
    contentEn: (campaign: Campaign) =>
      `${campaign.title} campaign has been rejected by the reviewer team.`,
    contentId: (campaign: Campaign) =>
      `Kampanye ${campaign.title} tidak disetujui oleh tim reviewer.`,
    deeplink: (id: number) =>
      `https://ecosense.id/deeplinks/campaigndetail/${id}`,
  },
  [NotificationType.CAMPAIGN_ENDING_SOON]: {
    icon: (campaign: Campaign) => campaign.poster_url,
    contentEn: (campaign: Campaign) =>
      `${campaign.title} campaign ends in 1 day! Let's finish the missions!`,
    contentId: (campaign: Campaign) =>
      `Kampanye ${campaign.title} akan berakhir dalam 1 hari! Yuk selesaikan misinya!`,
    deeplink: (id: number) =>
      `https://ecosense.id/deeplinks/campaigndetail/${id}`,
  },
};
