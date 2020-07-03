import { HttpStatus } from '@nestjs/common';

export const EX_EMAIL_EXISTS = {
  message: 'Email already exists',
  errorCode: HttpStatus.CONFLICT,
};

export const EX_IS_NOT_AUTHENTICATED = {
  message: `Not authenticated`,
  statusCode: HttpStatus.UNAUTHORIZED,
};

export const EX_INVALID_CREDENTIALS = {
  message: 'Invalid credentials',
};
