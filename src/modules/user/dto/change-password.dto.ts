import { Matches, IsNotEmpty } from 'class-validator';

export class ChangePasswordDTO {
  @Matches(/^(?=.*\d)[0-9a-zA-Z]{8,}$/, {
    message: 'Should contain at least 1 digit and 8 characters',
  })
  @IsNotEmpty()
  public password: string;
}
