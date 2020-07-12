import { EvaluationCriteriaEnum } from '@app/constants/app.enums';
export class EvaluationDTO {
  public content: string;

  public numberOfStar: number;

  public type: EvaluationCriteriaEnum;
}
