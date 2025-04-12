import { PrismaService } from '../../database/prisma.service';
import { Module } from '@nestjs/common';
import { SearchRequestService } from './search-request.service';
import { SearchRequestController } from './search-request.controller';

@Module({
  providers: [SearchRequestService, PrismaService],
  controllers: [SearchRequestController],
})
export class SearchRequestModule {}
