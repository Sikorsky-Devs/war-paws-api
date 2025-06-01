import { Comment } from '@prisma/client';

export class CommentResponse {
  shelterId: Comment['shelterId'];
  volunteerId: Comment['volunteerId'];
  stars: Comment['stars'];
  content: Comment['content'];
  createdAt: Comment['createdAt'];
}
