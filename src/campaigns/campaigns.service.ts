import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import {
  checkIsNew,
  checkIsTrending,
  convertToUnixTimestamp,
  getTimeStatus,
} from 'src/helpers';

import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CampaignsService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    try {
      const raw = await this.prisma.campaign.findMany({
        where: { deleted_at: null },
        include: {
          category: true,
          initiator: true,
          _count: { select: { join_records: true } },
        },
        orderBy: { id: 'asc' },
      });
      return {
        error: false,
        message: 'All campaigns fetched successfully',
        campaigns: raw.map((c) => ({
          id: c.id,
          title: c.title,
          description: c.description,
          participantCount: c._count.join_records,
          posterUrl: c.poster_url,
          category: {
            id: c.category.id,
            name: c.category.name,
            colorHex: c.category.color_hex,
          },
          ecopoints: c.ecopoints,
          resetEvery: c.reset_every,
          initiator: c.initiator.name,
          initiatorPhoto: c.initiator.profile_url,
          startDate: convertToUnixTimestamp(c.start_date),
          endDate: convertToUnixTimestamp(c.end_date),
          isTrending:
            getTimeStatus(c.start_date, c.end_date) === 'past'
              ? false
              : checkIsTrending(c._count.join_records || 0) ||
                checkIsNew(c.start_date),
          isNew:
            getTimeStatus(c.start_date, c.end_date) === 'past'
              ? false
              : checkIsNew(c.start_date),
          timeStatus: getTimeStatus(c.start_date, c.end_date),
          termsConditions: c.terms_conditions
            ? c.terms_conditions.split('\\n')
            : [],
        })),
      };
    } catch (err) {
      throw new HttpException(
        {
          error: true,
          message: err.message || 'Error fetching campaigns',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async findOne(campaignId: number) {
    try {
      return {
        error: false,
        message: 'Campaign details fetched successfully',
        campaign: await this.prisma.campaign
          .findUnique({
            where: { id: campaignId },
            include: {
              category: true,
              initiator: true,
              missions: true,
              join_records: { include: { user: true } },
              _count: { select: { join_records: true } },
            },
          })
          .then((c) => ({
            title: c.title,
            description: c.description,
            participantCount: c._count.join_records,
            posterUrl: c.poster_url,
            category: {
              id: c.id_category,
              name: c.category.name,
              colorHex: c.category.color_hex,
            },
            ecopoints: c.ecopoints,
            resetEvery: c.reset_every,
            initiator: c.initiator.name,
            initiatorPhoto: c.initiator.profile_url,
            startDate: convertToUnixTimestamp(c.start_date),
            endDate: convertToUnixTimestamp(c.end_date),
            isTrending:
              getTimeStatus(c.start_date, c.end_date) === 'past'
                ? false
                : checkIsTrending(c._count.join_records),
            isNew:
              getTimeStatus(c.start_date, c.end_date) === 'past'
                ? false
                : checkIsNew(c.start_date),
            tasks: c.missions.map((m) => ({
              id: m.id,
              name: m.name,
              order: m.order_number,
              requireProof: m.require_proof,
            })),
            termsConditions: c.terms_conditions
              ? c.terms_conditions.split('\\n')
              : [],
            supporters: c.join_records.map((c) => c.user.profile_url || ''),
          })),
      };
    } catch (err) {
      throw new HttpException(
        {
          error: true,
          message: err.message || 'Error fetching campaign details',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}