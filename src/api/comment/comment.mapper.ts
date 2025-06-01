import { Injectable } from '@nestjs/common';
import { Comment } from '@prisma/client';
import { CommentResponse } from './response/comment.response';
import { CommentWithVolunteerEntity } from './entity/comment-with-volunteer.entity';
import { CommentWithVolunteerResponse } from './response/comment-with-volunteer.response';

@Injectable()
export class CommentMapper {
  get(entity: Comment): CommentResponse {
    return {
      shelterId: entity.shelterId,
      volunteerId: entity.volunteerId,
      stars: entity.stars,
      content: entity.content,
      createdAt: entity.createdAt,
    };
  }
  getWithVolunteer(
    entities: CommentWithVolunteerEntity[],
  ): CommentWithVolunteerResponse[] {
    return entities.map((entity) => ({
      volunteerId: entity.volunteerId,
      shelterId: entity.shelterId,
      stars: entity.stars,
      content: entity.content,
      createdAt: entity.createdAt,
      volunteer: {
        id: entity.volunteer.id,
        firstName: entity.volunteer.firstName,
        lastName: entity.volunteer.lastName,
        middleName: entity.volunteer.middleName,
      },
    }));
  }
}
