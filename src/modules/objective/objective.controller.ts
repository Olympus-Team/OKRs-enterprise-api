import { Controller, Post, UsePipes, Body, Get, Query, Param, UseGuards, Delete } from '@nestjs/common';
import { ApiOkResponse, ApiBadRequestResponse } from '@nestjs/swagger';
import { Transaction, TransactionManager, EntityManager } from 'typeorm';

import { ObjectiveService } from './objective.service';
import { OkrsDTO } from './objective.dto';
import { ValidationPipe } from '@app/shared/pipes/validation.pipe';
import { ResponseModel } from '@app/constants/app.interface';
import { AuthenticationGuard } from '../auth/authentication.guard';
import { CommonMessage } from '@app/constants/app.enums';
import { CurrentUser } from '../user/user.decorator';
import { UserEntity } from '@app/db/entities/user.entity';

@Controller('/api/v1/objectives')
@UseGuards(AuthenticationGuard)
export class ObjectiveController {
  constructor(private _objectiveService: ObjectiveService) {}
  @Post()
  @ApiOkResponse({ description: CommonMessage.SUCCESS })
  @ApiBadRequestResponse({ description: CommonMessage.BAD_REQUEST })
  @UsePipes(new ValidationPipe())
  @Transaction({ isolation: 'SERIALIZABLE' })
  public createAndUpdateOKRs(
    @CurrentUser() user: UserEntity,
    @Body() data: OkrsDTO,
    @TransactionManager() manager: EntityManager,
  ): Promise<ResponseModel> {
    return this._objectiveService.createAndUpdateOKRs(data, manager, user.id);
  }

  @Get(':id')
  @ApiOkResponse({ description: CommonMessage.SUCCESS })
  @ApiBadRequestResponse({ description: CommonMessage.BAD_REQUEST })
  public async viewDetailOKRs(@Param('id') id: number): Promise<ResponseModel> {
    return this._objectiveService.getDetailOKRs(id);
  }

  @Get()
  @ApiOkResponse({ description: CommonMessage.SUCCESS })
  @ApiBadRequestResponse({ description: CommonMessage.BAD_REQUEST })
  public async viewOKRs(@Query('cycleID') cycleID: number, @Query('text') text: string): Promise<ResponseModel> {
    return this._objectiveService.viewOKRs(cycleID, text);
  }

  @Delete(':id')
  @ApiOkResponse({ description: CommonMessage.SUCCESS })
  @ApiBadRequestResponse({ description: CommonMessage.BAD_REQUEST })
  public deleteOKRs(@Param('id') id: number): Promise<ResponseModel> {
    return this._objectiveService.deleteOKRs(id);
  }
}
