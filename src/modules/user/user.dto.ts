import { IsNotEmpty, IsEmail, Matches } from 'class-validator';
import { passwordValidation } from '@app/constants/app.config';
import { Optional } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
export class ResetPasswordDTO {
  @IsNotEmpty()
  @IsEmail()
  @ApiProperty()
  public email: string;
}

export class ChangePasswordDTO {
  @Matches(passwordValidation.regex, {
    message: passwordValidation.message,
  })
  @IsNotEmpty()
  @ApiProperty()
  public password: string;

  @Matches(passwordValidation.regex, {
    message: passwordValidation.message,
  })
  @IsNotEmpty()
  @ApiProperty()
  public newPassword: string;
}

export class PasswordDTO {
  @Matches(passwordValidation.regex, {
    message: passwordValidation.message,
  })
  @IsNotEmpty()
  @ApiProperty()
  public password: string;
}

export class UserDTO {
  @Optional()
  public isLeader: boolean;

  @Optional()
  public roleId: number;

  @Optional()
  public teamId: number;

  @Optional()
  public jobPositionId: number;
}

export class UserProfileDTO {
  @Optional()
  public fullName: string;

  @Optional()
  public avatarURl: string;

  @Optional()
  public gravatarURL: string;
}

export class ResetPasswordTokenDTO {
  public resetPasswordToken: string;

  public resetPasswordTokenExpire: Date;
}
