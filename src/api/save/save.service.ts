import { Injectable } from '@nestjs/common';
import { SaveWithPetEntity } from './entity/save-with-pet.entity';
import { SaveRepository } from './save.repository';

@Injectable()
export class SaveService {
  constructor(private readonly saveRepository: SaveRepository) {}

  savePet(userId: string, petId: string): Promise<SaveWithPetEntity> {
    return this.saveRepository.create(userId, petId);
  }

  deleteSavedPet(userId: string, petId: string): Promise<SaveWithPetEntity> {
    return this.saveRepository.delete(userId, petId);
  }

  getSavedPetsByUser(userId: string): Promise<SaveWithPetEntity[]> {
    return this.saveRepository.findManyByUserId(userId);
  }
}
