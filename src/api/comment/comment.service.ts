import { Injectable } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { CommentRepository } from './comment.repository';
import { Comment } from '@prisma/client';
import { CommentWithVolunteerEntity } from './entity/comment-with-volunteer.entity';

@Injectable()
export class CommentService {
  constructor(private readonly commentRepository: CommentRepository) {}

  createComment(
    volunteerId: string,
    shelterId: string,
    { stars, content }: CreateCommentDto,
  ): Promise<Comment> {
    return this.commentRepository.create({
      volunteerId,
      shelterId,
      stars,
      content,
    });
  }

  getCommentsByShelter(
    shelterId: string,
  ): Promise<CommentWithVolunteerEntity[]> {
    return this.commentRepository.findByShelterWithVolunteer(shelterId);
  }
}
