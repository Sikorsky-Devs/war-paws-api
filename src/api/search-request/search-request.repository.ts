import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import { Prisma } from '@prisma/client';
import { SearchRequestEntity } from './entity/search-request.entity';
import { SearchRequestWithVolunteerEntity } from './entity/search-request-with-volunteer.entity';

@Injectable()
export class SearchRequestRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async create(
    data: Prisma.SearchRequestUncheckedCreateInput,
  ): Promise<SearchRequestEntity> {
    return this.prismaService.searchRequest.create({
      data,
    });
  }

  async findMany(
    data: Prisma.SearchRequestFindManyArgs,
  ): Promise<SearchRequestWithVolunteerEntity[]> {
    return this.prismaService.searchRequest.findMany({
      ...data,
      include: {
        volunteer: true,
      },
    });
  }

  async findById(id: string): Promise<SearchRequestWithVolunteerEntity> {
    return this.prismaService.searchRequest.findFirst({
      where: { id },
      include: {
        volunteer: true,
      },
    });
  }
}
