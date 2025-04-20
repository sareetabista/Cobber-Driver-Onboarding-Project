import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { ApiBody } from '@nestjs/swagger';
import { SubmitFormDto } from './dto/submit-form.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiBody({ type: SubmitFormDto })
  @Post('/submit-form')
  @UseGuards(AuthGuard('jwt'))
  async uploadDocumemt(@Body() userDetails: SubmitFormDto) {
    return await this.userService.saveUserDetails(userDetails);
  }
}
