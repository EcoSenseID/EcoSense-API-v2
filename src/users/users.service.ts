import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService, private auth: AuthService) {}

  async getAllUsers() {
    try {
      return {
        error: false,
        message: 'Users fetched successfully.',
        users: await this.auth.listAllUsers(),
        dbUsers: await this.prisma.user.findMany({ orderBy: { id: 'asc' } }),
      };
    } catch (err) {
      throw new HttpException(
        { error: true, message: err.message || 'Failed to fetch users.' },
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
