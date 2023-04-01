import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class RewardCategoriesService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
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
  }
}
