import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class VehicleDetailsDto {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  number: string;

  @ApiProperty()
  @IsString()
  model: string;

  @ApiProperty()
  @IsString()
  type: string;

  @ApiProperty()
  @IsString()
  license_type: string;
}
