import { Module } from '@nestjs/common';
import { PetController } from './pet.controller';
import { PrismaService } from '../../database/prisma.service';
import { PetService } from './pet.service';
import { FileModule } from '../../file/file.module';

@Module({
  controllers: [PetController],
  providers: [PetService, PrismaService],
  imports: [FileModule],
})
export class PetModule {}
