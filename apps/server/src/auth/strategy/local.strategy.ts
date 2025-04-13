import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../auth.service';
import { User } from 'src/user/models/user.schema';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({ usernameField: 'email' });
    console.log('reache here llll');
  }

  async validate(
    email: string,
    password: string,
  ): Promise<Omit<User, 'password'>> {
    console.log('Trying to validate:', email, password);

    const user = await this.authService.validateUser(email, password);
    return user;
  }
}
