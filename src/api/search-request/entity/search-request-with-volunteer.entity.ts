import { SearchRequestEntity } from './search-request.entity';
import { UserEntity } from '../../user/entity/user.entity';

export class SearchRequestWithVolunteerEntity extends SearchRequestEntity {
  volunteer: UserEntity;
}
