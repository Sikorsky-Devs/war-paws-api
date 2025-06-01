import { PostEntity } from './post.entity';
import { UserEntity } from '../../user/entity/user.entity';

export class PostWithUserEntity extends PostEntity {
  user: UserEntity;
}
