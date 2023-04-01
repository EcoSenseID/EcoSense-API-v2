import { Injectable } from '@nestjs/common';
import { convertToUnixTimestamp } from 'src/helpers';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class RewardsService {
  constructor(private prisma: PrismaService) {}

  async findAllDonations() {
    try {
      return {
        error: false,
        message: 'Fetch rewards success!',
        donations: await this.prisma.reward
          .findMany({
            where: { deleted_at: null, id_category: 2 },
            include: { claims: { where: { status: 3, deleted_at: null } } },
            orderBy: { id: 'asc' },
          })
          .then((rewards) =>
            rewards.map((r) => ({
              id: r.id,
              photoUrl: r.photo_url,
              title: r.title,
              description: r.description,
              ecopoints: r.ecopoints,
              validUntil: convertToUnixTimestamp(r.valid_until),
              completedCount: r.claims.length,
            })),
          ),
      };
    } catch (err) {
      return {
        error: true,
        message: err.message || 'Fetch rewards failed!',
      };
    }
  }

  async findOneDonation(rewardId: number) {
    try {
      return {
        error: false,
        message: 'Fetch rewards success!',
        ...(await this.prisma.reward
          .findUnique({
            where: { id: rewardId },
            include: {
              claims: { include: { users: true }, where: { deleted_at: null } },
              category: true,
            },
          })
          .then((reward) => ({
            id: reward.id,
            photoUrl: reward.photo_url,
            title: reward.title,
            partner: reward.partner,
            description: reward.description,
            ecopoints: reward.ecopoints,
            validUntil: convertToUnixTimestamp(reward.valid_until),
            termsConditions: reward.terms_and_conditions.split('\\n'),
            category: {
              id: reward.id_category,
              name: reward.category.name,
            },
            howToUse: reward.how_to_use.split('\\n'),
            maxRedeem: reward.max_redeem,
            redeemedCount: reward.claims.filter((c) => c.status === 1).length,
            requestedCount: reward.claims.filter((c) => c.status === 2).length,
            completedCount: reward.claims.filter((c) => c.status === 3).length,
            donators:
              reward.claims?.map((c) => c.users.profile_url || '') || [],
          }))),
      };
    } catch (err) {
      return {
        error: true,
        message: err.message || 'Fetch rewards failed!',
      };
    }
  }

  findAll() {
    return 'This action returns all rewards';
  }
}
