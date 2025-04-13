import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import { AccountType } from '@prisma/client';

@Injectable()
export class MessageService {
  constructor(private readonly prisma: PrismaService) {}

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

  async getHistory(senderId: string, receiverId: string) {
    return this.prisma.message.findMany({
      where: {
        OR: [
          {
            shelterId: senderId,
            volunteerId: receiverId,
          },
          {
            shelterId: receiverId,
            volunteerId: senderId,
          },
        ],
      },
      ...this.include,
      orderBy: { createdAt: 'asc' },
    });
  }

  async genSocketGroupId(senderId: string, receiverId: string) {
    const { accountType } = await this.prisma.user.findFirst({
      where: { id: senderId },
      select: { accountType: true },
    });
    if (accountType === AccountType.VOLUNTEER) {
      return senderId + receiverId;
    }
    return receiverId + senderId;
  }

  async saveMessage(senderId: string, receiverId: string, content: string) {
    const sender = await this.prisma.user.findFirst({
      where: { id: senderId },
      select: { accountType: true },
    });
    return this.prisma.message.create({
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
