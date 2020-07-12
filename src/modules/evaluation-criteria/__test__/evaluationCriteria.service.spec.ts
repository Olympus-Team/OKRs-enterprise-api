import { Test, TestingModule } from '@nestjs/testing';
import { EvaluationCriteriaService } from '../evaluation-criteria.service';
describe('EvaluationCriteriaService', () => {
  let service: EvaluationCriteriaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EvaluationCriteriaService],
    }).compile();

    service = module.get<EvaluationCriteriaService>(EvaluationCriteriaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
