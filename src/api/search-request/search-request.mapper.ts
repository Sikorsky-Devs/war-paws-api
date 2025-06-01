import { Injectable } from '@nestjs/common';
import { SearchRequestWithVolunteerEntity } from './entity/search-request-with-volunteer.entity';
import { MappedSearchRequestWithVolunteerEntity } from './entity/mapped-search-request-with-volunteer.entity';

@Injectable()
export class SearchRequestMapper {
  mapSearchRequestEntity(
    searchRequest: SearchRequestWithVolunteerEntity,
  ): MappedSearchRequestWithVolunteerEntity {
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

  mapSearchRequestEntities(
    searchRequests: SearchRequestWithVolunteerEntity[],
  ): MappedSearchRequestWithVolunteerEntity[] {
    return searchRequests.map((r) => this.mapSearchRequestEntity(r));
  }
}
