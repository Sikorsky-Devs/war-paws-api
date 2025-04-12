import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import { SearchRequestCreateDto } from './dto/search-request-create.dto';
import { Prisma } from '@prisma/client';
import { EntityNotFoundException } from '../../utils/exception/entity-not-found.exception';

@Injectable()
export class SearchRequestService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: SearchRequestCreateDto) {
    const data: Prisma.SearchRequestUncheckedCreateInput = {
      ...dto,
    };
    return this.prisma.searchRequest.create({ data });
  }

  async getMany() {
    const searchRequests = await this.prisma.searchRequest.findMany({
      include: {
        volunteer: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
    return searchRequests.map((r) => ({
      ...r,
      volunteer: {
        id: r.volunteerId,
        firstName: r.volunteer.firstName,
        lastName: r.volunteer.lastName,
        middleName: r.volunteer.middleName,
      },
    }));
  }

  async delete(id: string) {
    const searchRequest = await this.prisma.searchRequest.findFirst({
      where: { id },
    });
    if (!searchRequest) {
      throw new EntityNotFoundException('Search Request', 'id');
    }
    return this.prisma.searchRequest.delete({ where: { id } });
  }

  async getById(id: string) {
    const searchRequest = await this.prisma.searchRequest.findFirst({
      where: { id },
      include: {
        volunteer: true,
      },
    });
    if (!searchRequest) {
      throw new EntityNotFoundException('Search Request', 'id');
    }
    return {
      ...searchRequest,
      volunteer: {
        id: searchRequest.volunteerId,
        firstName: searchRequest.volunteer.firstName,
        lastName: searchRequest.volunteer.lastName,
        middleName: searchRequest.volunteer.middleName,
      },
    };
  }
}
