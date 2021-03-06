import { Controller, UseGuards, Delete, Param, ParseIntPipe } from '@nestjs/common';

import { KeyResultService } from './keyresult.service';
import { AuthenticationGuard } from '../auth/authentication.guard';
import { ResponseModel } from '@app/constants/app.interface';
import { SwaggerAPI } from '@app/shared/decorators/api-swagger.decorator';
import { CurrentUser } from '../user/user.decorator';
import { UserEntity } from '@app/db/entities/user.entity';

@Controller('/api/v1/key_results')
@UseGuards(AuthenticationGuard)
@SwaggerAPI()
export class KeyResultController {
  constructor(private _keyResultService: KeyResultService) {}

  @Delete(':id')
  public deleteKeyResult(@CurrentUser() me: UserEntity, @Param('id', ParseIntPipe) id: number): Promise<ResponseModel> {
    return this._keyResultService.deleteKeyResult(id, me.id);
  }
}
