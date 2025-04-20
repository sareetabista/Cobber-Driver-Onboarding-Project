import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { RegiterDto } from './dto/register-user.dto';
import * as bcrypt from 'bcrypt';
import { ResponseMessages } from 'src/shared/constants/message.constant';
import { User } from 'src/user/models/user.schema';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @Inject() private readonly userService: UserService,
    private jwtService: JwtService,
  ) {}

  async register(payload: RegiterDto) {
    return await this.userService.register(payload);
  }

  async validateUser(email: string, password: string) {
    const user = await this.userService.getUserByEmail(email);
    const doesPasswordMatch = await bcrypt.compare(password, user.password);
    if (doesPasswordMatch) {
      const { password, ...userWithoutPassword } = user.toObject();
      return userWithoutPassword;
    } else {
      throw new UnauthorizedException([ResponseMessages.INVALID_CREDENTIALS]);
    }
  }

  login(user: Omit<User, 'password'>) {
    const payload = { user };
    return {
      access_token: this.jwtService.sign(payload, {
        expiresIn: '7d',
      }),
      message: [ResponseMessages.LOGIN_SUCCESS],
      success: true,
    };
  }
}
