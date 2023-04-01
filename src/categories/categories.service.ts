import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CategoriesService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    try {
      return {
        error: false,
        message: 'Categories fetched successfully',
        categories: await this.prisma.category.findMany().then((catgs) =>
          catgs.map((data) => ({
            id: data.id,
            photoUrl: data.photo_url,
            name: data.name,
            colorHex: data.color_hex,
          })),
        ),
      };
    } catch (err) {
      throw new HttpException(
        {
          error: true,
          message: err.message || 'Categories fetch failed',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
