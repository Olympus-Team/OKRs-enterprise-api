import { Optional } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, Matches } from 'class-validator';
import { passwordValidation } from '@app/constants/app.config';

export class RegisterDTO {
  @ApiProperty()
  @IsEmail()
  @IsNotEmpty()
  public readonly email: string;

  @ApiProperty()
  @Matches(passwordValidation.regex, {
    message: passwordValidation.message,
  })
  @IsNotEmpty()
  public readonly password: string;

  @ApiProperty()
  @IsNotEmpty()
  public readonly fullName: string;

  @Optional()
  public readonly avatarUrl: string;
}

export class SignInDTO {
  @ApiProperty()
  @IsNotEmpty()
  public readonly email: string;

  @ApiProperty()
  @IsNotEmpty()
  public readonly password: string;
}
