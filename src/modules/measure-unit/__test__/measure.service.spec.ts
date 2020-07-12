import { Test, TestingModule } from '@nestjs/testing';

import { MeasureUnitService } from '../measure-unit.service';

describe('MeasureUnitService', () => {
  let service: MeasureUnitService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MeasureUnitService],
    }).compile();

    service = module.get<MeasureUnitService>(MeasureUnitService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
