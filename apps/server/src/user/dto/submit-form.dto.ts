import { Type } from 'class-transformer';
import { IsObject, IsString, ValidateNested } from 'class-validator';
import { VehicleDetailsDto } from './vehicle-details.dto';
import { ApiProperty } from '@nestjs/swagger';

export class SubmitFormDto {
  @ApiProperty()
  @IsString()
  fullname: string;

  @ApiProperty()
  @IsObject()
  @ValidateNested()
  @Type(() => VehicleDetailsDto)
  vehicleDetails: VehicleDetailsDto;

  @ApiProperty()
  @IsString()
  abn_number: string;
}
