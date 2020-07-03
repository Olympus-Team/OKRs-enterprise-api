import { IsNotEmpty, IsEmail, Matches } from 'class-validator';
import { passwordValidation } from '@app/constants/app.config';

export class ResetPasswordDTO {
  @IsNotEmpty()
  @IsEmail()
  public email: string;

  public password: string;
}

export class ChangePasswordDTO {
  @Matches(passwordValidation.regex, {
    message: passwordValidation.message,
  })
  @IsNotEmpty()
  public password: string;
}
