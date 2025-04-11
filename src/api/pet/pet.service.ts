import { Injectable } from '@nestjs/common';
import { PetCreateDto } from './dto/pet-create.dto';
import { PrismaService } from '../../database/prisma.service';
import { FileService } from '../../file/file.service';
import { EntityNotFoundException } from '../../utils/exception/entity-not-found.exception';
import { PetUpdateDto } from './dto/pet-update.dto';
import { PetQueriesDto } from './dto/pet-queries.dto';
import { DatabaseUtils } from '../../utils/database.utils';
import { Pet } from '@prisma/client';

@Injectable()
export class PetService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly fileService: FileService,
  ) {}

  async create(data: PetCreateDto) {
    return this.prisma.pet.create({ data });
  }

  async uploadImage(file: Express.Multer.File, petId: string) {
    const link = this.fileService.uploadFile(file);
    const pet = await this.prisma.pet.findFirst({ where: { id: petId } });
    if (pet.imageLink) {
      this.fileService.deleteFile(pet.imageLink);
    }
    await this.prisma.pet.update({
      where: { id: petId },
      data: { imageLink: link },
    });
    return { link };
  }

  async getById(id: string) {
    const pet = await this.prisma.pet.findFirst({
      where: { id },
    });
    if (!pet) {
      throw new EntityNotFoundException('Pet', 'id');
    }
    return pet;
  }

  async update(id: string, data: PetUpdateDto) {
    const pet = await this.prisma.pet.findFirst({ where: { id } });
    if (!pet) {
      throw new EntityNotFoundException('Pet', 'id');
    }
    return this.prisma.pet.update({
      where: { id },
      data,
    });
  }

  async getMany(dto: PetQueriesDto) {
    const search = DatabaseUtils.getSearch<
      Pick<Pet, 'name' | 'breed' | 'address' | 'description'>
    >(dto.search, 'name', 'breed', 'address', 'description');

    const pets = await this.prisma.pet.findMany({
      where: {
        ...search,
        type: dto.type,
        heathStatus: dto.healthStatus,
        age: {
          gte: dto.ageFrom,
          lte: dto.ageTo,
        },
      },
      include: {
        shelter: {
          include: {
            shelterComments: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    const top = [];
    const common = [];

    pets.map((pet) => {
      const avg =
        pet.shelter.shelterComments.reduce((sum, comm) => sum + comm.stars, 0) /
        pet.shelter.shelterComments.length;
      const res = {
        id: pet.id,
        name: pet.name,
        shelter: pet.shelter.name,
        age: pet.age,
        address: pet.address,
        imageLink: pet.imageLink,
      };

      if (avg > 4.5) {
        top.push(res);
      } else {
        common.push(res);
      }
    });

    return { top, common };
  }

  async remove(id: string) {
    const pet = await this.prisma.pet.findFirst({ where: { id } });
    if (!pet) {
      throw new EntityNotFoundException('Pet', 'id');
    }
    return this.prisma.pet.delete({ where: { id } });
  }
}
