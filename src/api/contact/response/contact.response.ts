import { Contact } from '@prisma/client';

export class ContactResponse {
  id: Contact['id'];
  type: Contact['type'];
  content: Contact['content'];
  userId: Contact['userId'];
}
