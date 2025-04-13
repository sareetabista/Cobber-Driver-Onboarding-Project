import { IsEmail, IsString, MinLength, Validate } from 'class-validator';
import { IsUniquesConstraint } from 'src/shared/validators/is-unique.validator';

export class RegiterDto {
  @IsString()
  @IsEmail()
  @Validate(IsUniquesConstraint, ['email'])
  email: string;

  @IsString()
  @MinLength(8)
  password: string;
}
