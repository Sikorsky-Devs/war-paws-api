import { MessageService } from './message.service';
import { Module } from '@nestjs/common';
import { MessageGateway } from './message.gateway';
import { PrismaService } from '../../database/prisma.service';
import { MessageRepository } from './message.repository';

@Module({
  providers: [MessageService, MessageGateway, PrismaService, MessageRepository],
})
export class MessageModule {}
