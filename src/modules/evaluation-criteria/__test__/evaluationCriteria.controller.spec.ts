import { Test, TestingModule } from '@nestjs/testing';
import { EvaluationCriteriaController } from '../evaluation-criteria.controller';

describe('Criteria Controller', () => {
  let controller: EvaluationCriteriaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EvaluationCriteriaController],
    }).compile();

    controller = module.get<EvaluationCriteriaController>(EvaluationCriteriaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
