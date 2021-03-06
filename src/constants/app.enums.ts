export enum TableName {
  User = 'users',
  Objective = 'objectives',
  Team = 'teams',
  JobPosition = 'job_positions',
  Role = 'roles',
  UserTeam = 'user_teams',
  LessonOKRs = 'lesson_okrs',
  KeyResult = 'key_results',
  MeasureUnit = 'measure_units',
  Cycle = 'cycles',
  Checkin = 'checkins',
  EvaluationCriteria = 'evaluation_criterias',
  UserStar = 'user_stars',
  Lesson = 'lessons',
  InviteToken = 'invite_tokens',
  CheckinDetail = 'checkin_details',
  CFRs = 'cfrs',
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
  STAFF = 'STAFF',
}

export enum ForeignKey {
  ROLE_ID = 'roleId',
  JOB_POSITION_ID = 'jobPositionId',
  USER_ID = 'userId',
  TEAM_ID = 'teamId',
  CYCLE_ID = 'cycleId',
  MEASURE_UNIT_ID = 'measureUnitId',
  CHECKIN_ID = 'checkinId',
  EVALUATION_CRITERIA_ID = 'evaluationCriteriaId',
  OBJECTIVE_ID = 'objectiveId',
  PARENT_OBJECTIVE_ID = 'parentObjectiveId',
  ALIGN_OBJECTIVE_ID = 'alignObjectivesId',
  KEY_RESULTS_ID = 'keyResultId',
  SENDER_ID = 'senderId',
  RECEIVER_ID = 'receiverId',
}

export enum EvaluationCriteriaEnum {
  MEMBER_TO_LEADER = 'MEMBER_TO_LEADER',
  LEADER_TO_MEMBER = 'LEADER_TO_MEMBER',
  RECOGNITION = 'RECOGNITION',
}

export enum ObjectiveTypeEnum {
  MOON_SHOT = 'Moonshot',
  ROOF_SHOT = 'Roofshot',
}

export enum GenderEnum {
  FEMALE = 0,
  MALE = 1,
  OTHER = 2,
}

export enum CommonMessage {
  SUCCESS = 'success',
  CYCLE_DATE = 'End date must be greater than start date',
  BAD_REQUEST = 'Bad request',
  INTERNAL_SERVER_ERROR = 'Internal server error',
  PASSWORD_UPDATE_SUCCESS = 'Password successfully updated',
  PASSWORD_FAIL = 'Mật khẩu không chính xác',
  VALID_TOKEN = 'Token is valid',
  INVALID_TOKEN = 'Token is invalid',
  EXPIRED_TOKEN = 'Token is expired',
  EMAIL_SENT = 'Email sent successfully',
  USER_DO_NOT_EXIST = `User doesn't exist`,
  DATABASE_EXCEPTION = 'Error when access to database',
  DELETE_FAIL = 'Delete fail',
  LOGOUT_SUCCESS = 'Logout success',
  UNAUTHORIZED = 'Unauthorized Error',
  FORBIDDEN = 'Forbidden',
  EMAIL_NOT_FOUND = 'Email không tồn tại',
  NOT_TEAM_LEADER = 'User is not a team leader',
  UPLOAD_SUCCESS = 'Upload successful',
  POST_NOT_FOUND = 'Không thể tìm thấy bài viết',
  BODY_EMPTY = 'Body is empty',
  DATA_NOT_FOUND = 'Không thể tìm thấy dữ liệu',
}

export enum Status {
  ACTIVE = 1,
  PENDING = 0,
  DEAVCTIVE = -1,
}

export enum CheckinStatus {
  DRAFT = 'Draft',
  PENDING = 'Pending',
  DONE = 'Done',
  CLOSED = 'Closed',
}

export enum CheckinStatusLogic {
  DRAFT = 'Draft',
  PENDING = 'Pending',
  OVERDUE = 'Overdue',
  DONE = 'Done',
  COMPLETED = 'Completed',
}

export enum CheckinType {
  COMPANY = 1,
  MEMBER = 2,
  PERSONAL = 3,
}

export enum ConfidentLevel {
  GOOD = 3,
  NORMAL = 2,
  BAD = 1,
}

export enum CycleStatus {
  CURRENT = 1,
  ALL = 2,
  CYCLE = 3,
}

export enum AvatarURL {
  URL = '/avatars/',
  DELETE_URL = 'avatars/',
}

export enum OKRsType {
  ROOT = 1,
  TEAM = 2,
  PERSONAL = 3,
  ONLY_PROGRESS = 4,
}

export enum TopStarType {
  SENDER = 1,
  RECEIVER = 2,
}

export enum OKRsLeaderType {
  ROOT = 1,
  TEAM_LEADER = 2,
  ALL = 3,
}

export enum TypeCFRsHistory {
  FEED_BACK = 'feedback',
  RECOGNITION = 'recognition',
}
export enum DeleteKeyresultType {
  KEY_RESULT = 1,
  OKR = 2,
}

export enum OKRsStatusType {
  GOOD = 'OKRs đang tiến triển tốt',
  NORMAL = 'OKRs đang tiến triển',
  BAD = 'OKRs có sự rủi ro',
  VERY_BAD = 'OKRs không tiến triển',
}

export enum CFRStatusType {
  FEED_BACK = 'Feedback',
  RECOGNITION = 'Recognition',
  MANAGER = 'quản lý sử dụng CFRs',
}

export enum CheckinStatusType {
  inDue = 'Đúng hạn',
  overDue = 'Sai hạn',
  notYet = 'Chưa Checkin',
}

export enum LessonThumbnail {
  thumbNail = 'https://image.flaticon.com/icons/svg/207/207473.svg',
}

export enum CFRsHistoryType {
  SENT = 1,
  RECEIVED = 2,
  ALL = 3,
}

export enum InferiorType {
  STAFF = 1,
  TEAM_LEADER = 2,
}
