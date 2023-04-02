import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCategoryDto, EditCategoryDto } from './dto';

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

  async create(dto: CreateCategoryDto) {
    try {
      return {
        error: false,
        message: 'Category created successfully',
        category: await this.prisma.category.create({
          data: {
            name: dto.name,
            photo_url: dto.photoUrl,
            color_hex: dto.colorHex,
          },
        }),
      };
    } catch (err) {
      throw new HttpException(
        { error: true, message: err.message || 'Category creation failed' },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async update(id: number, dto: EditCategoryDto) {
    try {
      return {
        error: false,
        message: 'Edit category success!',
        category: await this.prisma.category.update({
          where: { id },
          data: {
            name: dto.name,
            photo_url: dto.photoUrl,
            color_hex: dto.colorHex,
          },
        }),
      };
    } catch (err) {
      throw new HttpException(
        { error: true, message: err.message || 'Edit category failed!' },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async delete(id: number) {
    try {
      await this.prisma.category.delete({ where: { id } });
      await this.prisma
        .$queryRaw`SELECT setval('categories_id_seq', (SELECT MAX(id) FROM categories));`;
      return {
        error: false,
        message: 'Delete category success!',
      };
    } catch (err) {
      throw new HttpException(
        { error: true, message: err.message || 'Delete category failed!' },
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
