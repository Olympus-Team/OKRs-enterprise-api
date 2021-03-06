import { Test } from '@nestjs/testing';
import { ObjectiveService } from '../objective.service';
import { Connection } from 'typeorm';
import { AppModule } from '@app/app.module';

describe('Objective Service', () => {
  let objectiveService: ObjectiveService;
  let connection: Connection;
  const mockConnection = () => ({
    transaction: jest.fn(),
  });

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      imports: [AppModule],
      providers: [
        {
          provide: Connection,
          useFactory: mockConnection,
        },
      ],
    }).compile();

    objectiveService = await module.get<ObjectiveService>(ObjectiveService);
    connection = await module.get<Connection>(Connection);
  });

  describe('manage OKRs', () => {
    it('test create OKRs', async () => {
      const someMockedUsers: any = {};
      someMockedUsers.objective = {
        title: 'Test Create OKRs',
        parentObjectiveId: 4,
        cycleId: 3,
        isRootObjective: false,
      };
      someMockedUsers.keyResult = [
        { startValue: 0, targetValue: 100, content: 'KR1', linkPlans: '', linkResults: '', measureUnitId: 1 },
      ];
      const res = await objectiveService.createAndUpdateOKRs(someMockedUsers, connection.manager);
      expect(res).toBeDefined();
      expect(res.statusCode).toEqual(200);
    });

    it('test update OKRs', async () => {
      const someMockedUsers: any = {};
      someMockedUsers.objective = {
        id: 20,
        userId: 13,
        title: 'Test Update OKRs',
        parentObjectiveId: 4,
      };
      someMockedUsers.keyResult = [
        { startValue: 0, targetValue: 100, content: 'KR1', linkPlans: '', linkResults: '', measureUnitId: 1 },
      ];
      const res = await objectiveService.createAndUpdateOKRs(someMockedUsers, connection.manager);
      expect(res).toBeDefined();
      expect(res.statusCode).toEqual(200);
    });
    it('test get OKRs detail', async () => {
      const expectedResult = {
        objective: {
          title: 'Cải thiện sự gắn kết nhân viên nội bộ và sự hài lòng trong công việc',
          progress: 43,
        },
      };
      const res = await objectiveService.getDetailOKRs(8);
      expect(res).toBeDefined();
      expect(res.statusCode).toEqual(200);
      expect(res.data.title).toEqual(expectedResult.objective.title);
      expect(res.data.progress).toEqual(expectedResult.objective.progress);
    });

    it('test get OKRs detail', async () => {
      //const res = await objectiveService.deleteOKRs(20);
    });
  });
});
