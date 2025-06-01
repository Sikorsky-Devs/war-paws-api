import { Module } from '@nestjs/common';
import { CommentController } from './comment.controller';
import { CommentService } from './comment.service';
import { PrismaService } from '../../database/prisma.service';
import { CommentRepository } from './comment.repository';
import { CommentMapper } from './comment.mapper';

@Module({
  controllers: [CommentController],
  providers: [CommentService, CommentRepository, CommentMapper, PrismaService],
  exports: [CommentService],
})
export class CommentModule {}
