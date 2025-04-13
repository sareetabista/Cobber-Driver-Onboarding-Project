import { ApiProperty } from "@nestjs/swagger"

export class AuthReponseDto {
    @ApiProperty()
    message: string[]
  
    @ApiProperty()
    success: boolean
  
    @ApiProperty()
    access_token: string
  }