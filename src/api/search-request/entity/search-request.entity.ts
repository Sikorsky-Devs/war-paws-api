import { PetType, HealthStatus } from '@prisma/client';

export class SearchRequestEntity {
  id: string;
  volunteerId: string;
  petType?: PetType;
  ageFrom?: number;
  ageTo?: number;
  address?: string;
  breed?: string;
  healthStatus?: HealthStatus;
  createdAt: Date;
}
