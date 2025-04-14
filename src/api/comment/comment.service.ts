import { PrismaService } from '../../database/prisma.service';
import { Injectable } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';

@Injectable()
export class CommentService {
  constructor(private readonly prisma: PrismaService) {}

  createComment(
    volunteerId: string,
    shelterId: string,
    createCommentDto: CreateCommentDto,
  ) {
    return this.prisma.comment.create({
      data: {
        volunteerId,
        shelterId,
        stars: createCommentDto.stars,
        content: createCommentDto.content,
      },
    });
  }

  getCommentsByShelter(shelterId: string) {
    return this.prisma.comment.findMany({
      where: {
        shelterId,
      },
      include: {
        volunteer: true,
      },
    });
  }
}
