import { $Enums } from '@prisma/client';

export class UserEntity {
  id: string;
  email: string;
  firstName: string;
  middleName: string;
  lastName: string;
  name: string;
  accountType: $Enums.AccountType;
  shelterType: $Enums.ShelterType;
  address: string;
  description: string;
  password: string;
  avatarLink: string;
  donationLink: string;
}
