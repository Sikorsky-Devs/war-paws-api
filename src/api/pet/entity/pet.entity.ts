import { $Enums } from '@prisma/client';

export class PetEntity {
  id: string;
  shelterId: string;
  isApproved: boolean;
  heathStatus?: $Enums.HealthStatus;
  type: $Enums.PetType;
  name?: string;
  age?: number;
  breed?: string;
  address?: string;
  description?: string;
  imageLink?: string;
  createdAt: Date;
}
