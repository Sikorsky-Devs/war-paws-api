import { Comment, User } from '@prisma/client';

export class CommentWithVolunteerResponse {
  volunteerId: Comment['volunteerId'];
  shelterId: Comment['shelterId'];
  stars: Comment['stars'];
  content: Comment['content'];
  createdAt: Comment['createdAt'];
  volunteer: Pick<User, 'id' | 'firstName' | 'lastName' | 'middleName'>;
}
