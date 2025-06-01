import { Injectable } from '@nestjs/common';
import { Contact } from '@prisma/client';
import { ContactResponse } from './response/contact.response';

@Injectable()
export class ContactMapper {
  get(entity: Contact): ContactResponse {
    return {
      id: entity.id,
      userId: entity.userId,
      type: entity.type,
      content: entity.content,
    };
  }
}
