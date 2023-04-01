import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class NewsService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return {
      error: false,
      message: 'News fetched successfully.',
      news: await this.prisma.news
        .findMany({
          where: { deleted_at: null },
          orderBy: { date: 'asc' },
        })
        .then((news) =>
          news.map((n) => ({
            id: n.id,
            title: n.title,
            description: n.description,
            date: n.date,
            photoUrl: n.photo_url,
            newsUrl: n.news_url,
          })),
        ),
    };
  }
}
