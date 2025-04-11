import { HealthStatus, PetType } from '@prisma/client';

export class PetCreateDto {
  shelterId: string;
  isApproved: boolean;
  healthStatus?: HealthStatus;
  type: PetType;
  name?: string;
  age?: number;
  breed?: string;
  address?: string;
  description?: string;
}
