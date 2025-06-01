import { Module } from '@nestjs/common';
import { SaveController } from './save.controller';
import { SaveService } from './save.service';
import { PrismaService } from '../../database/prisma.service';
import { SaveRepository } from './save.repository';

@Module({
  imports: [],
  controllers: [SaveController],
  providers: [SaveService, PrismaService, SaveRepository],
  exports: [SaveService, SaveRepository],
})
export class SaveModule {}
