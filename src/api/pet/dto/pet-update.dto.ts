import { PetCreateDto } from './pet-create.dto';

export type PetUpdateDto = Partial<Omit<PetCreateDto, 'shelterId'>>;
