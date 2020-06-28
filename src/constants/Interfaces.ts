import { UserEntity } from 'src/db/entities/user.entity';

export interface JwtPayload {
  id: number;
}

export interface UserToken {
  user: UserEntity;
  token: string;
}
