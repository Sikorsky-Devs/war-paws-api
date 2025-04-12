import {Injectable} from "@nestjs/common";
import {PrismaService} from "../../database/prisma.service";

@Injectable()
export class SaveService {
  constructor(
    private readonly prisma: PrismaService,
  ) {}

  savePet(userId: string, petId: string) {
    return this.prisma.save.create({
      data: {
        volunteerId: userId,
        petId,
      },
      include: {
        pet: true,
      }
    })
  }

  deleteSavedPet(userId: string, petId: string) {
    return this.prisma.save.delete({
      where: {
        volunteerId_petId: {
          volunteerId: userId,
          petId: petId,
        },
      },
      include: {
        pet: true,
      }
    });
  }

  getSavedPetsByUser(userId: string) {
    return this.prisma.save.findMany({
      where: {
        volunteerId: userId,
      },
      include: {
        pet: true,
      }
    })
  }
}