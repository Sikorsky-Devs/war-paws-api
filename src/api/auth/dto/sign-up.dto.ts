import { AccountType } from '@prisma/client';

export class SignUpDto {
  email: string;
  firstName?: string;
  middleName?: string;
  lastName?: string;
  name?: string;
  accountType: AccountType;
  password: string;
}
