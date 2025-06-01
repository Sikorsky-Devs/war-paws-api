import { Injectable } from '@nestjs/common';
import { $Enums } from '@prisma/client';
import { PostRepository } from './post.repository';
import { PostEntity } from './entity/post.entity';
import { CreatePostDto } from './dto/create-post.dto';

@Injectable()
export class PostService {
  constructor(private readonly postRepository: PostRepository) {}

  createPost(
    userId: string,
    createPostDto: CreatePostDto,
  ): Promise<PostEntity> {
    return this.postRepository.create({
      userId,
      title: createPostDto.title,
      content: createPostDto.content,
    });
  }

  getPosts(accountType: $Enums.AccountType) {
    return this.postRepository.getPostsByAccountTypeWithUsers(accountType);
  }
}
