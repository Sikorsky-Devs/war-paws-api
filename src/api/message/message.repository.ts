import { PrismaService } from '../../database/prisma.service';
import { Injectable } from '@nestjs/common';
import { AccountType, Prisma } from '@prisma/client';
import { MessageWithShelterAndVolunteerEntity } from './entity/message-with-shelter-and-volunteer.entity';

@Injectable()
export class MessageRepository {
  constructor(private readonly prismaService: PrismaService) {}

  private include = {
    include: {
      shelter: {
        select: {
          id: true,
          firstName: true,
          middleName: true,
          lastName: true,
          name: true,
          accountType: true,
          avatarLink: true,
        },
      },
      volunteer: {
        select: {
          id: true,
          firstName: true,
          middleName: true,
          lastName: true,
          name: true,
          accountType: true,
          avatarLink: true,
        },
      },
    },
  };

  async findMany(
    data: Prisma.MessageFindManyArgs,
  ): Promise<MessageWithShelterAndVolunteerEntity[]> {
    return this.prismaService.message.findMany({
      ...data,
      ...this.include,
    });
  }

  async create(
    senderId: string,
    receiverId: string,
    content: string,
  ): Promise<MessageWithShelterAndVolunteerEntity> {
    const sender = await this.prismaService.user.findFirst({
      where: { id: senderId },
      select: { accountType: true },
    });
    return this.prismaService.message.create({
      data: {
        content,
        shelterId:
          sender.accountType === AccountType.SHELTER ? senderId : receiverId,
        volunteerId:
          sender.accountType === AccountType.VOLUNTEER ? senderId : receiverId,
        from: sender.accountType,
      },
      ...this.include,
    });
  }
}
