import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import { AccountType } from '@prisma/client';
import { MessageRepository } from './message.repository';
import { MessageWithShelterAndVolunteerEntity } from './entity/message-with-shelter-and-volunteer.entity';

@Injectable()
export class MessageService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly messageRepository: MessageRepository,
  ) {}

  async getHistory(
    senderId: string,
    receiverId: string,
  ): Promise<MessageWithShelterAndVolunteerEntity[]> {
    return this.messageRepository.findMany({
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
      orderBy: { createdAt: 'asc' },
    });
  }

  async genSocketGroupId(
    senderId: string,
    receiverId: string,
  ): Promise<string> {
    const { accountType } = await this.prisma.user.findFirst({
      where: { id: senderId },
      select: { accountType: true },
    });
    if (accountType === AccountType.VOLUNTEER) {
      return senderId + receiverId;
    }
    return receiverId + senderId;
  }

  async saveMessage(
    senderId: string,
    receiverId: string,
    content: string,
  ): Promise<MessageWithShelterAndVolunteerEntity> {
    return this.messageRepository.create(senderId, receiverId, content);
  }
}
