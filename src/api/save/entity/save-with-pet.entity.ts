import { PetEntity } from '../../pet/entity/pet.entity';
import { SaveEntity } from './save.entity';

export class SaveWithPetEntity extends SaveEntity {
  pet: PetEntity;
}
