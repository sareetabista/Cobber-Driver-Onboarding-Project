import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegiterDto } from './dto/register-user.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() body: RegiterDto) {
    return this.authService.register(body);
  }

  @Post('login')
  @UseGuards(AuthGuard('local'))
  login(@Request() req) {
    return this.authService.login(req?.user);
  }
}
