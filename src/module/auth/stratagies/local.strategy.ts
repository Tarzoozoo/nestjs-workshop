import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { AuthService } from '../auth.service';
import { AuthUserInfo } from '../auth.model';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({ usernameField: 'email' });
  }

  // The verify callback function (validate method) called by Passport
  async validate(email: string, password: string): Promise<AuthUserInfo> {
    return await this.authService.validateEmail(email, password);
  }
}
