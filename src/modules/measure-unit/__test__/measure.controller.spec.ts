import { Test, TestingModule } from '@nestjs/testing';

import { MeasureUnitController } from '../measure-unit.controller';

describe('MeasureUnit Controller', () => {
  let controller: MeasureUnitController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MeasureUnitController],
    }).compile();

    controller = module.get<MeasureUnitController>(MeasureUnitController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
