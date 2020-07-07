import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction } from 'express';

@Injectable()
export class RateLimitMiddleware implements NestMiddleware {
  public use(req: Request, res: Response, next: NextFunction): void {
    return next();
  }
}
