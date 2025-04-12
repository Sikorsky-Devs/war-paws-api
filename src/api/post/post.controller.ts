import {
  Body,
  Controller,
  Post,
  Req,
  Get,
  Query,
  UseGuards,
} from '@nestjs/common';
import { Request } from 'express';
import { PostService } from './post.service';
import { $Enums } from '@prisma/client';
import { AuthGuard } from '../auth/guard/auth.guard';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @UseGuards(AuthGuard())
  @Post()
  async createPost(
    @Req() req: Request,
    @Body() createPostDto: { title: string; content: string },
  ) {
    return this.postService.createPost(req['user'].id, createPostDto);
  }

  @Get()
  async findAll(@Query() filterPostsDto: { accountType: $Enums.AccountType }) {
    return this.postService.getPosts(filterPostsDto.accountType);
  }
}
