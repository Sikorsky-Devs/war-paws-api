import { MessageService } from './message.service';
import { Module } from '@nestjs/common';
import { MessageGateway } from './message.gateway';
import { PrismaService } from '../../database/prisma.service';

@Module({
  providers: [MessageService, MessageGateway, PrismaService],
})
export class MessageModule {}
