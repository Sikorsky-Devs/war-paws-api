import { PrismaService } from '../../database/prisma.service';
import { Module } from '@nestjs/common';
import { SearchRequestService } from './search-request.service';
import { SearchRequestController } from './search-request.controller';
import { SearchRequestMapper } from './search-request.mapper';
import { SearchRequestRepository } from './search-request.repository';

@Module({
  providers: [
    SearchRequestService,
    PrismaService,
    SearchRequestMapper,
    SearchRequestRepository,
  ],
  controllers: [SearchRequestController],
  exports: [SearchRequestMapper, SearchRequestRepository],
})
export class SearchRequestModule {}
