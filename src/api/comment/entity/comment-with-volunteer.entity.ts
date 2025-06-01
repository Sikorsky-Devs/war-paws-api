import { User } from '@prisma/client';
import { Comment } from '@prisma/client';

export class CommentWithVolunteerEntity {
  volunteerId: Comment['volunteerId'];
  shelterId: Comment['shelterId'];
  stars: Comment['stars'];
  content: Comment['content'];
  createdAt: Comment['createdAt'];
  volunteer: User;
}
