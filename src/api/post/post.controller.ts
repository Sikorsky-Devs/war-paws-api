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
import { AuthGuard } from '../auth/guard/auth.guard';
import { CreatePostDto } from './dto/create-post.dto';
import { FindAllPostsByAccountTypeDto } from './dto/find-all-posts-by-account-type.dto';
import { PostWithUserEntity } from './entity/post-with-user.entity';
import { PostEntity } from './entity/post.entity';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @UseGuards(AuthGuard())
  @Post()
  async createPost(
    @Req() req: Request,
    @Body() createPostDto: CreatePostDto,
  ): Promise<PostEntity> {
    return this.postService.createPost(req['user'].id, createPostDto);
  }

  @Get()
  async findAll(
    @Query() filterPostsDto: FindAllPostsByAccountTypeDto,
  ): Promise<PostWithUserEntity[]> {
    return this.postService.getPosts(filterPostsDto.accountType);
  }
}
