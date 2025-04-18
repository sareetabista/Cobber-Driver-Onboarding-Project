import { Prop } from "@nestjs/mongoose";
import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class VehicleDetailsDto {
    @ApiProperty()
    @Prop()
    @IsString()
    name: string

    @ApiProperty()
    @Prop()
    @IsString()
    number: string

    @ApiProperty()
    @Prop()
    @IsString()
    model: string
}