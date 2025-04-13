import { HealthStatus, PetType } from '@prisma/client';

export class PetQueriesDto {
  shelterId?: string;
  search?: string;
  type?: PetType;
  ageFrom?: number;
  ageTo?: number;
  healthStatus?: HealthStatus;
  userId?: string;
}
