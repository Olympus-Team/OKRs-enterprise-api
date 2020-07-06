export enum TableName {
  User = 'users',
  Objective = 'objectives',
  Teams = 'teams',
  JobPosition = 'job_positions',
  Role = 'roles',
  UserTeam = 'user_teams',
  LessonOKRs = 'lesson_okrs',
  KeyResult = 'key_results',
  MeasureUnit = 'measure_units',
  Cycle = 'cycles',
  Checkin = 'checkins',
  Recognition = 'recognitions',
  Feeback = 'feedbacks',
  EvaluationCriteria = 'evaluation_criterias',
  TemplateCheckin = 'template_checkins',
  FieldTemplate = 'field_templates',
  UserStar = 'user_stars',
}

export enum DbConfig {
  DB_TYPE = 'postgres',
  DB_HOST = 'DB_HOST',
  DB_USER = 'DB_USER',
  DB_PASSWORD = 'DB_PASSWORD',
  DB_NAME = 'DB_NAME',
  DB_PORT = 'DB_PORT',
}

export enum RoleEnum {
  ADMIN = 'ADMIN',
  HR = 'HR',
  TEAM_LEADER = 'TEAM_LEADER',
  STAFF = 'STAFF',
}

export enum ForeignKey {
  ID = 'id',
  ROLE_ID = 'roleId',
  JOB_POSITION_ID = 'jobPositionId',
  USER_ID = 'userId',
  TEAM_ID = 'teamId',
  CYCLE_ID = 'cycleId',
  MEASURE_UNIT_ID = 'measureUnitId',
  TEMPLATE_ID = 'templateId',
  TEMPLATE_CHECKIN_ID = 'templateCheckinId',
  CHECKIN_ID = 'checkinId',
  EVALUATION_CRITERIA_ID = 'evaluationCriteriaId',
  OBJECTIVE_ID = 'objectiveId',
  PARENT_OBJECTIVE_ID = 'parentObjectiveId',
  ALIGN_OBJECTIVE_ID = 'alignObjectiveId',
  KEY_RESULTS_ID = 'keyResultId',
}
