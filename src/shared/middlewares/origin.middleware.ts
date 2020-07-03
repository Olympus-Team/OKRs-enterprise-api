import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction } from 'express';

@Injectable()
export class OriginMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction): void {
    return next();
  }
}
