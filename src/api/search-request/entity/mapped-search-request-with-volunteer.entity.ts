import { SearchRequestWithVolunteerEntity } from './search-request-with-volunteer.entity';
import { OmitType } from '@nestjs/swagger';
import { MappedUserEntity } from '../../user/entity/mapped.user.entity';

export class MappedSearchRequestWithVolunteerEntity extends OmitType(
  SearchRequestWithVolunteerEntity,
  ['volunteer'],
) {
  volunteer: MappedUserEntity;
}
