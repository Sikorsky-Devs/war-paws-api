import { $Enums } from '@prisma/client';

export class MessageEntity {
  volunteerId: string;
  id: string;
  shelterId: string;
  from: $Enums.AccountType;
  content: string;
  createdAt: Date;
}
