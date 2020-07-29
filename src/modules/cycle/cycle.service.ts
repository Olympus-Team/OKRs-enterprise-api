import { Injectable, HttpStatus, HttpException } from '@nestjs/common';

import { CycleRepository } from './cycle.repository';
import { CycleDTO, updateCycleDTO } from './cycle.dto';
import { ResponseModel } from '@app/constants/app.interface';
import { CommonMessage, CycleStatus } from '@app/constants/app.enums';
import { IPaginationOptions, paginate } from 'nestjs-typeorm-paginate';
import { CycleEntity } from '@app/db/entities/cycle.entity';
import { CYCLE_EXIST } from '@app/constants/app.exeption';

@Injectable()
export class CycleService {
  constructor(private _cycleRepository: CycleRepository) {}

  public async getCycle(status: string, options: IPaginationOptions): Promise<ResponseModel> {
    let data = null;
    if (status && status == CycleStatus.CURRENT) {
      const currentDate = new Date();
      data = await this._cycleRepository.getCurrentCycle(currentDate);
    } else {
      data = await paginate<CycleEntity>(this._cycleRepository, options);
    }
    return {
      statusCode: HttpStatus.OK,
      message: CommonMessage.SUCCESS,
      data: data,
    };
  }

  public async createCycle(cycleDTO: CycleDTO): Promise<ResponseModel> {
    const startDate = new Date(cycleDTO.startDate).getTime();
    const endDate = new Date(cycleDTO.endDate).getTime();
    const cycles = await this._cycleRepository.getList();
    const checkCycleExist = (cycleParam) => cycles.some(({ name }) => name == cycleParam);
    if (checkCycleExist(cycleDTO.name)) {
      throw new HttpException(CYCLE_EXIST.message, CYCLE_EXIST.statusCode);
    }
    if (startDate >= endDate) {
      throw new HttpException(CommonMessage.CYCLE_DATE, HttpStatus.BAD_REQUEST);
    }
    const data = await this._cycleRepository.createCycle(cycleDTO);
    return {
      statusCode: HttpStatus.CREATED,
      message: CommonMessage.SUCCESS,
      data: data,
    };
  }

  public async getCycleDetail(id: number): Promise<ResponseModel> {
    const data = await this._cycleRepository.getCycleDetail(id);
    return {
      statusCode: HttpStatus.OK,
      message: CommonMessage.SUCCESS,
      data: data,
    };
  }

  public async updateCycle(id: number, cycleDTO: updateCycleDTO): Promise<ResponseModel> {
    const startDate = new Date(cycleDTO.startDate).getTime();
    const endDate = new Date(cycleDTO.endDate).getTime();
    const cycles = await this._cycleRepository.getList();
    const checkCycleExist = (cycleParam) => cycles.some(({ name }) => name == cycleParam);
    if (checkCycleExist(cycleDTO.name)) {
      throw new HttpException(CYCLE_EXIST.message, CYCLE_EXIST.statusCode);
    }
    if (startDate >= endDate) {
      throw new HttpException(CommonMessage.CYCLE_DATE, HttpStatus.BAD_REQUEST);
    }
    const data = await this._cycleRepository.updateCycle(id, cycleDTO);
    return {
      statusCode: HttpStatus.OK,
      message: CommonMessage.SUCCESS,
      data: data,
    };
  }

  public async deleteCycle(id: number): Promise<ResponseModel> {
    const data = await this._cycleRepository.deleteCycle(id);
    return {
      statusCode: HttpStatus.OK,
      message: CommonMessage.SUCCESS,
      data: data,
    };
  }
}
