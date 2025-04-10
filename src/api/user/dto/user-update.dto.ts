import { ShelterType } from '@prisma/client';

export class UserUpdateDto {
  firstName?: string;
  middleName?: string;
  lastName?: string;
  name?: string;
  shelterType?: ShelterType;
  address?: string;
  description?: string;
  donationLink?: string;
  currentPassword?: string;
  newPassword?: string;
}
