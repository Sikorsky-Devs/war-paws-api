import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class UserRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async findMany(data: Prisma.UserFindManyArgs) {
    return this.prismaService.user.findMany(data);
  }

  async findById(userId: string) {
    return this.prismaService.user.findFirst({
      where: {
        id: userId,
      },
    });
  }

  async update(userId: string, data: Prisma.UserUncheckedUpdateInput) {
    return this.prismaService.user.update({
      where: {
        id: userId,
      },
      data,
    });
  }

  async deleteById(userId: string) {
    return this.prismaService.user.delete({
      where: {
        id: userId,
      },
    });
  }
}
