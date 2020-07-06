import { IsEmail, IsNotEmpty, Matches, IsBoolean } from 'class-validator';
import { passwordValidation } from '@app/constants/app.config';
export class CreateUserDto {
  @IsEmail()
  @IsNotEmpty()
  public readonly email: string;

  @Matches(passwordValidation.regex, {
    message: passwordValidation.message,
  })
  @IsNotEmpty()
  public readonly password: string;

  @IsNotEmpty()
  public readonly fullName: string;

  @IsNotEmpty()
  @IsBoolean()
  public readonly isApproved: boolean;
}
