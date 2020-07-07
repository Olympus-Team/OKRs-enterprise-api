import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  public root(): any {
    return 'Hello World Motherfucker';
  }
}
