import { ApiTags } from '@nestjs/swagger';
import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { SearchRequestCreateDto } from './dto/search-request-create.dto';
import { SearchRequestService } from './search-request.service';

@ApiTags('Search Request')
@Controller('/requests')
export class SearchRequestController {
  constructor(private readonly searchRequestService: SearchRequestService) {}

  @Post()
  create(@Body() body: SearchRequestCreateDto) {
    return this.searchRequestService.create(body);
  }

  @Get()
  getMany() {
    return this.searchRequestService.getMany();
  }

  @Get('/:id')
  getById(@Param('id') id: string) {
    return this.searchRequestService.getById(id);
  }
}
