import { ApiTags } from '@nestjs/swagger';
import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { SearchRequestCreateDto } from './dto/search-request-create.dto';
import { SearchRequestService } from './search-request.service';
import { SearchRequestEntity } from './entity/search-request.entity';
import { MappedSearchRequestWithVolunteerEntity } from './entity/mapped-search-request-with-volunteer.entity';

@ApiTags('Search Request')
@Controller('/requests')
export class SearchRequestController {
  constructor(private readonly searchRequestService: SearchRequestService) {}

  @Post()
  create(@Body() body: SearchRequestCreateDto): Promise<SearchRequestEntity> {
    return this.searchRequestService.create(body);
  }

  @Get()
  getMany(): Promise<MappedSearchRequestWithVolunteerEntity[]> {
    return this.searchRequestService.getMany();
  }

  @Get('/:id')
  getById(
    @Param('id') id: string,
  ): Promise<MappedSearchRequestWithVolunteerEntity> {
    return this.searchRequestService.getById(id);
  }
}
