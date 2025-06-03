import { HealthStatus, PetType } from '@prisma/client';
import { IsNotEmpty } from 'class-validator';

export class SearchRequestCreateDto {
  @IsNotEmpty({ message: 'Volunteer id is required' })
  volunteerId: string;

  petType?: PetType;
  ageFrom?: number;
  ageTo?: number;
  address?: string;
  breed?: string;
  healthStatus?: HealthStatus;
}
