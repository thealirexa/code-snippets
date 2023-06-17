import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PaginationTypes } from 'src/utils/interfaces';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async getAllUsers({ page, limit }: PaginationTypes) {
    const skip = (page - 1) * limit;
    const [users, total] = await Promise.all([
      this.prisma.user.findMany({ skip, take: limit }),
      this.prisma.user.count(),
    ]);
    const nextPage = skip + limit < total;

    return {
      success: true,
      data: users,
      total,
      limit,
      page,
      nextPage,
      message: 'Users fetched successfully',
      status: HttpStatus.OK,
    };
  }
}
