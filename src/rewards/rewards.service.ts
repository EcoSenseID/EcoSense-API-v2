import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { convertToUnixTimestamp } from 'src/helpers';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateRewardDto, EditRewardDto } from './dto';
import { StorageService } from 'src/storage/storage.service';
import { CLAIM_STATUS } from './claims.enum';
import { NotificationService } from 'src/notification/notification.service';
import {
  NotificationObject,
  NotificationType,
} from 'src/notification/notification.enum';

@Injectable()
export class RewardsService {
  constructor(
    private prisma: PrismaService,
    private storage: StorageService,
    private notification: NotificationService,
  ) {}

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
          .then((r) => ({
            id: r.id,
            photoUrl: r.photo_url,
            title: r.title,
            partner: r.partner,
            description: r.description,
            ecopoints: r.ecopoints,
            validUntil: convertToUnixTimestamp(r.valid_until),
            termsConditions: r.terms_and_conditions.split('\\n'),
            category: { id: r.id_category, name: r.category.name },
            howToUse: r.how_to_use.split('\\n'),
            maxRedeem: r.max_redeem,
            redeemedCount: r.claims.filter((c) => c.status === 1).length,
            requestedCount: r.claims.filter((c) => c.status === 2).length,
            completedCount: r.claims.filter((c) => c.status === 3).length,
            donators: r.claims?.map((c) => c.users.profile_url || '') || [],
          }))),
      };
    } catch (err) {
      throw new HttpException(
        { error: true, message: err.message || 'Fetch rewards failed!' },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  findAll() {
    try {
      return {
        error: false,
        message: 'Fetch rewards success!',
        rewards: this.prisma.reward
          .findMany({
            where: { deleted_at: null },
            include: { category: true, claims: true },
            orderBy: { id: 'asc' },
          })
          .then((rewards) =>
            rewards.map((r) => ({
              id: r.id,
              photoUrl: r.photo_url,
              title: r.title,
              partner: r.partner,
              description: r.description,
              ecopoints: r.ecopoints,
              validUntil: r.valid_until,
              termsConditions: r.terms_and_conditions.split('\\n'),
              category: { id: r.id_category, name: r.category.name },
              howToUse: r.how_to_use.split('\\n'),
              maxRedeem: r.max_redeem,
              redeemedCount: r.claims.filter((c) => c.status === 1).length,
              requestedCount: r.claims.filter((c) => c.status === 2).length,
              completedCount: r.claims.filter((c) => c.status === 3).length,
            })),
          ),
      };
    } catch (err) {
      throw new HttpException(
        { error: true, message: err.message || 'Fetch rewards failed!' },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async create(dto: CreateRewardDto, file: Express.Multer.File) {
    try {
      // Store poster image to Google Cloud Storage
      const { error, gcsUrl: photo_url } =
        await this.storage.uploadRewardPoster(file);
      if (error) {
        throw new HttpException(
          'Upload poster failed.',
          HttpStatus.BAD_REQUEST,
        );
      }

      // Store data to database
      await this.prisma.reward.create({
        data: {
          ...dto,
          photo_url,
          valid_until: dto.validUntil,
          terms_and_conditions: dto.termsConditions.join('\\n'),
          how_to_use: dto.howToUse.join('\\n'),
          max_redeem: dto.maxRedeem,
          category: { connect: { id: dto.categoryId } },
        },
      });
      return {
        error: false,
        message: 'Add new reward success!',
      };
    } catch (err) {
      throw new HttpException(
        {
          error: true,
          message: err.message || 'Add reward failed!',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async update(
    id: number,
    dto: EditRewardDto,
    posterChanged: boolean,
    file?: Express.Multer.File,
  ) {
    if (posterChanged && !file) {
      throw new HttpException(
        { error: true, message: 'Poster not detected!' },
        HttpStatus.BAD_REQUEST,
      );
    }
    try {
      let posterGCSURL = dto.photoUrl;
      if (posterChanged) {
        // Store poster image to Google Cloud Storage
        const { error, gcsUrl } = await this.storage.uploadRewardPoster(file);
        if (error) {
          throw new HttpException(
            'Upload poster failed.',
            HttpStatus.BAD_REQUEST,
          );
        }
        posterGCSURL = gcsUrl;
      }
      // Store data to database
      await this.prisma.reward.update({
        where: { id },
        data: {
          ...dto,
          photo_url: posterGCSURL,
          valid_until: dto.validUntil,
          terms_and_conditions: dto.termsConditions.join('\\n'),
          how_to_use: dto.howToUse.join('\\n'),
          max_redeem: dto.maxRedeem,
          category: { connect: { id: dto.category.id } },
        },
      });
      return {
        error: false,
        message: 'Edit reward success!',
      };
    } catch (err) {
      throw new HttpException(
        { error: true, message: err.message || 'Edit reward failed!' },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async delete(id: number) {
    try {
      await this.prisma.reward.update({
        where: { id },
        data: { deleted_at: new Date() },
      });
      return {
        error: false,
        message: 'Delete reward success!',
      };
    } catch (err) {
      throw new HttpException(
        { error: true, message: err.message || 'Delete reward failed!' },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async validateClaim(validatorId: number, claimId: number) {
    try {
      const { id_user, id_reward } = await this.prisma.rewardClaim.update({
        where: { id: claimId },
        data: { status: CLAIM_STATUS.completed },
      });
      // Send notification to user
      this.notification.send(
        id_user,
        validatorId,
        NotificationType.REWARD_SENT,
        NotificationObject.REWARD,
        id_reward,
      );
      return {
        error: false,
        message: 'Validate reward claim success!',
      };
    } catch (err) {
      throw new HttpException(
        {
          error: true,
          message: err.message || 'Validate reward claim failed!',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
