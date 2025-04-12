import { Module } from '@nestjs/common';
import { PostController } from './post.controller';
import { PostService } from './post.service';
import {PrismaService} from "../../database/prisma.service";

@Module({
  providers: [PostService, PrismaService],
  controllers: [PostController],
  imports: [],
  exports: [PostService],
})
export class PostModule {}
