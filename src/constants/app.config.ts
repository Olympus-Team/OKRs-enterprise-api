import accessEnv from '@app/libs/accessEnv';
import { genSaltSync } from 'bcryptjs';

/**
 * Interval time 1 hour (60 * 60 * 1000 ms)
 * Up to 5000 requests per ip
 */
export const API_REQUEST_RATE_LIMIT = {
  windowMs: 60 * 60 * 1000,
  max: 5000,
};

export const environment = accessEnv('NODE_ENV');
export const isDevMode = Object.is(environment, 'development');
export const isProdMode = Object.is(environment, 'production');

const SALT_WORK_FACTORY = accessEnv('SALT_WORK_FACTORY');
export const _salt = genSaltSync(+SALT_WORK_FACTORY);
