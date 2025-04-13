import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MinLength, Validate } from 'class-validator';
import { IsUniquesConstraint } from 'src/shared/validators/is-unique.validator';

export class RegiterDto {
  @ApiProperty()
  @IsString()
  @IsEmail()
  @Validate(IsUniquesConstraint, ['email'])
  email: string;

  @ApiProperty()
  @IsString()
  @MinLength(8)
  password: string;
}
