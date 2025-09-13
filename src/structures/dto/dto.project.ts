import { IsNotEmpty, IsString, MinLength } from 'class-validator';
import { Transform } from 'class-transformer';

export class DtoProjectCreate {
  @IsString()
  @IsNotEmpty()
  @Transform(({ value: title }) => title.trim())
  title: string;

  @IsString()
  @IsNotEmpty()
  @Transform(({ value: description }) => description.trim())
  description: string;
}
