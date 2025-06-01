import { $Enums } from '@prisma/client';

export class UserInMessageEntity {
  id: string;
  firstName?: string;
  middleName?: string;
  lastName?: string;
  name?: string;
  accountType: $Enums.AccountType;
  avatarLink?: string;
}
