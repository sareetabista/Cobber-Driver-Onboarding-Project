import { Type } from 'class-transformer';
import { IsObject, IsString, ValidateNested } from 'class-validator';
import { VehicleDetailsDto } from './vehicle-details.dto';
import { ApiProperty } from '@nestjs/swagger';

export class SubmitFormDto {
  @ApiProperty()
  @IsString()
  fullname: string;

  @ApiProperty()
  @IsString()
  address: string;

  @ApiProperty()
  @IsObject()
  @ValidateNested()
  @Type(() => VehicleDetailsDto)
  vehicleDetails: VehicleDetailsDto;

  @ApiProperty()
  @IsString()
  abn_number: string;

  @ApiProperty()
  @IsString()
  phone: string;

  @ApiProperty()
  @IsString()
  fair_pay: string;

  @ApiProperty()
  @IsString()
  hours_commitment: string;

  @ApiProperty()
  @IsString()
  days_commitment: string;

  @ApiProperty()
  @IsString()
  willing_to_move_large_goods: string;

  @ApiProperty()
  @IsString()
  start_date: string;
}
