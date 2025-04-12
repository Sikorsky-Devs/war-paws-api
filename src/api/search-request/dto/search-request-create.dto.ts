import { HealthStatus, PetType } from '@prisma/client';

export class SearchRequestCreateDto {
  volunteerId: string;
  petType?: PetType;
  ageFrom?: number;
  ageTo?: number;
  address?: string;
  breed?: string;
  healthStatus?: HealthStatus;
}
