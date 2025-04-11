import { HealthStatus, PetType } from '@prisma/client';

export class PetQueriesDto {
  search?: string;
  type?: PetType;
  ageFrom?: number;
  ageTo?: number;
  healthStatus?: HealthStatus;
}
