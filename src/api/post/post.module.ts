import { Module } from '@nestjs/common';
import { PostController } from './post.controller';
import { PostService } from './post.service';
import { PrismaService } from '../../database/prisma.service';
import { PostRepository } from './post.repository';

@Module({
  providers: [PostService, PrismaService, PostRepository],
  controllers: [PostController],
  exports: [PostService, PostRepository],
})
export class PostModule {}
