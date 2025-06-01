import { Injectable } from '@nestjs/common';
import { SearchRequestCreateDto } from './dto/search-request-create.dto';
import { EntityNotFoundException } from '../../utils/exception/entity-not-found.exception';
import { SearchRequestRepository } from './search-request.repository';
import { SearchRequestMapper } from './search-request.mapper';
import { MappedSearchRequestWithVolunteerEntity } from './entity/mapped-search-request-with-volunteer.entity';
import { SearchRequestEntity } from './entity/search-request.entity';

@Injectable()
export class SearchRequestService {
  constructor(
    private readonly searchRequestRepository: SearchRequestRepository,
    private readonly searchRequestMapper: SearchRequestMapper,
  ) {}

  async create(dto: SearchRequestCreateDto): Promise<SearchRequestEntity> {
    return this.searchRequestRepository.create(dto);
  }

  async getMany(): Promise<MappedSearchRequestWithVolunteerEntity[]> {
    const searchRequests = await this.searchRequestRepository.findMany({});
    return this.searchRequestMapper.mapSearchRequestEntities(searchRequests);
  }

  async getById(id: string): Promise<MappedSearchRequestWithVolunteerEntity> {
    const searchRequest = await this.searchRequestRepository.findById(id);
    if (!searchRequest) {
      throw new EntityNotFoundException('Search Request', 'id');
    }
    return this.searchRequestMapper.mapSearchRequestEntity(searchRequest);
  }
}
