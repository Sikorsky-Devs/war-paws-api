import { Module } from '@nestjs/common';
import { ContactService } from './contact.service';
import { ContactController } from './contact.controller';
import { PrismaService } from '../../database/prisma.service';
import { ContactRepository } from './contact.repository';
import { ContactMapper } from './contact.mapper';

@Module({
  controllers: [ContactController],
  providers: [ContactService, ContactRepository, ContactMapper, PrismaService],
})
export class ContactModule {}
