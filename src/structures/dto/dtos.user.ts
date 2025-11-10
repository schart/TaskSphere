import { IsNotEmpty, IsString, MinLength } from 'class-validator';
import { Transform } from 'class-transformer';
import { IsEmail } from 'sequelize-typescript';

export class UpdateUserDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @Transform(({ value: username }) => username.trim())
  username: string;
}

export class UserEmailDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(12)
  @Transform(({ value: email }) => email.trim())
  email: string;
}
