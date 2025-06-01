import { MessageEntity } from './message.entity';
import { UserInMessageEntity } from '../../user/entity/user-in-message.entity';

export class MessageWithShelterAndVolunteerEntity extends MessageEntity {
  shelter: UserInMessageEntity;
  volunteer: UserInMessageEntity;
}
