import { Injectable } from '@nestjs/common';
import { Prisma, Comment } from '@prisma/client';
import { PrismaService } from '../../database/prisma.service';
import { CommentWithVolunteerEntity } from './entity/comment-with-volunteer.entity';

@Injectable()
export class CommentRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: Prisma.CommentUncheckedCreateInput): Promise<Comment> {
    return this.prisma.comment.create({ data });
  }

  async findByShelterWithVolunteer(
    shelterId: string,
  ): Promise<CommentWithVolunteerEntity[]> {
    return this.prisma.comment.findMany({
      where: { shelterId },
      include: {
        volunteer: true,
      },
    });
  }
}
