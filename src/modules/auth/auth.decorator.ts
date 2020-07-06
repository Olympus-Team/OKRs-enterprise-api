import { SetMetadata } from '@nestjs/common';
import { RoleEnum } from '@app/constants/app.enums';
import { ROLE_KEY } from '@app/constants/app.config';

export const Roles = (roles: RoleEnum[]): any => SetMetadata(ROLE_KEY, roles);
