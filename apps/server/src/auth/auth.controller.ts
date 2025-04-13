import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegiterDto } from './dto/register-user.dto';
import { AuthGuard } from '@nestjs/passport';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { LoginDto } from './dto/login-user.dto';
import { AuthReponseDto } from './dto/auth-response.dto';

@ApiTags("Authentication")
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @ApiBody({ type: RegiterDto })
  @ApiResponse({ status: 201, type: AuthReponseDto })
  @Post('register')
  async register(@Body() body: RegiterDto) {
    return this.authService.register(body);
  }

  @ApiBody({ type: LoginDto })
  @ApiResponse({ status: 201, type: AuthReponseDto })
  @Post('login')
  @UseGuards(AuthGuard('local'))
  login(@Request() req) {
    return this.authService.login(req?.user);
  }
}
