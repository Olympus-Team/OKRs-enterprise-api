import { HttpStatus } from '@nestjs/common';

export const EX_EMAIL_EXISTS = {
  message: 'Email already exists',
  errorCode: HttpStatus.CONFLICT,
};

export const EX_UNAUTHENTICATED = {
  message: `Not authenticated`,
  statusCode: HttpStatus.FORBIDDEN,
};

export const EX_UNAUTHORIZED = {
  message: `Unauthorized access`,
  statusCode: HttpStatus.UNAUTHORIZED,
};

export const EX_INVALID_CREDENTIALS = {
  message: 'Invalid credentials',
};

export const EX_MISSING_AUTHENTICATION_GUARD =
  'Could not find user under execution context. Please make sure AuthenticationGuard are defined first.';
