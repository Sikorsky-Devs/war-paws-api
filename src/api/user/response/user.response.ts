import { AccountType, ShelterType } from '@prisma/client';

export class UserResponse {
  id: string;
  email: string;
  firstName: string;
  middleName: string;
  lastName: string;
  name: string;
  accountType: AccountType;
  shelterType: ShelterType;
  address: string;
  description: string;
  donationLink: string;
  avatarLink: string;
}
