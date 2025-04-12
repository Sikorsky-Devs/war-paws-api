import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import { $Enums } from '@prisma/client';

@Injectable()
export class PostService {
  constructor(private readonly prisma: PrismaService) {}

  createPost(
    userId: string,
    createPostDto: { title: string; content: string },
  ) {
    return this.prisma.post.create({
      data: {
        userId,
        title: createPostDto.title,
        content: createPostDto.content,
      },
    });
  }

  getPosts(accountType: $Enums.AccountType) {
    return this.prisma.post.findMany({
      where: {
        user: {
          accountType,
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        user: {
          select: {
            id: true,
            firstName: true,
            middleName: true,
            lastName: true,
            name: true,
          },
        }
      }
    });
  }
}
