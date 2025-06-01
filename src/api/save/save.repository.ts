import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import { SaveWithPetEntity } from './entity/save-with-pet.entity';

@Injectable()
export class SaveRepository {
  constructor(private readonly prismaService: PrismaService) {}

  private readonly include = {
    pet: true,
  };

  async create(userId: string, petId: string): Promise<SaveWithPetEntity> {
    return this.prismaService.save.create({
      data: {
        volunteerId: userId,
        petId,
      },
      include: this.include,
    });
  }

  async delete(userId: string, petId: string): Promise<SaveWithPetEntity> {
    return this.prismaService.save.delete({
      where: {
        volunteerId_petId: {
          volunteerId: userId,
          petId: petId,
        },
      },
      include: this.include,
    });
  }

  async findManyByUserId(userId: string): Promise<SaveWithPetEntity[]> {
    return this.prismaService.save.findMany({
      where: {
        volunteerId: userId,
      },
      include: this.include,
    });
  }
}
