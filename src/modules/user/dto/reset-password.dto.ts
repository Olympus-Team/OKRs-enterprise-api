import { IsNotEmpty, IsEmail } from 'class-validator';

export class ResetPasswordDTO {
  @IsNotEmpty()
  @IsEmail()
  public email: string;

  public password: string;
}
