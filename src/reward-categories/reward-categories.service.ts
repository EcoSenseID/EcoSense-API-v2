import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateRewardCategoryDto, UpdateRewardCategoryDto } from './dto';

@Injectable()
export class RewardCategoriesService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    try {
      return {
        error: false,
        message: 'Fetch reward categories success!',
        rewardCategories: await this.prisma.rewardCategory
          .findMany({
            include: { _count: { select: { rewards: true } } },
          })
          .then((res) =>
            res.map((c) => ({
              id: c.id,
              name: c.name,
              rewardCount: c._count.rewards,
            })),
          ),
      };
    } catch (err) {
      throw new HttpException(
        {
          error: true,
          message: err.message || 'Fetch reward categories failed',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async create(dto: CreateRewardCategoryDto) {
    try {
      await this.prisma.rewardCategory.create({
        data: { name: dto.name },
      });
      return { error: false, message: 'Add new reward category success!' };
    } catch (err) {
      throw new HttpException(
        { error: true, message: err.message || 'Add reward category failed' },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async update(id: number, dto: UpdateRewardCategoryDto) {
    try {
      await this.prisma.rewardCategory.update({
        where: { id },
        data: { name: dto.name },
      });
      return { error: false, message: 'Edit reward category success!' };
    } catch (err) {
      throw new HttpException(
        { error: true, message: err.message || 'Edit reward category failed!' },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async delete(id: number) {
    try {
      await this.prisma.rewardCategory.update({
        where: { id },
        data: { deleted_at: new Date() },
      });
      return { error: false, message: 'Delete reward category success!' };
    } catch (err) {
      throw new HttpException(
        {
          error: true,
          message: err.message || 'Delete reward category failed!',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
