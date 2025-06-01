import { PrismaService } from '../../database/prisma.service';
import { $Enums, Prisma } from '@prisma/client';
import { PostEntity } from './entity/post.entity';
import { Injectable } from '@nestjs/common';
import { PostWithUserEntity } from './entity/post-with-user.entity';

@Injectable()
export class PostRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async create(data: Prisma.PostUncheckedCreateInput): Promise<PostEntity> {
    return this.prismaService.post.create({
      data,
    });
  }

  async getPostsByAccountTypeWithUsers(
    accountType: $Enums.AccountType,
  ): Promise<PostWithUserEntity[]> {
    return this.prismaService.post.findMany({
      where: {
        user: {
          accountType,
        },
      },
      include: {
        user: true,
      },
    });
  }
}
