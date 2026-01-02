import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import {
  AuthUserInfo,
  AccessToken,
  AuthModel,
  authModelSchema,
} from './auth.model';
import { JwtService } from '@nestjs/jwt';
import { AuthRepository } from './auth.repository';
import { RegisterUserDTO } from './auth.dto';
import { AuthInsertEntity } from './auth.entity';
import { OAuthUser } from './oauth/types/oauth-user.type';
@Injectable()
export class AuthService {
  constructor(
    private readonly authRepo: AuthRepository,
    private readonly jwtService: JwtService,
  ) {}

  async validateEmail(email: string, password: string): Promise<AuthUserInfo> {
    const user = await this.findAuthOneByEmail(email);
    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new UnauthorizedException('Invalid password');
    }

    return {
      id: user.id,
      name: user.name,
      tel: user.tel,
      email: user.email,
    };
  }

  async login(user: AuthUserInfo): Promise<AccessToken> {
    const payload = { email: user.email, sub: user.id };
    const access_token = this.jwtService.sign(payload);
    return {
      access_token: access_token,
    };
  }

  async registerFromOauthUser(payload: OAuthUser): Promise<AuthModel> {
    const registerEntity: AuthInsertEntity = {
      name: payload.firstName + ' ' + payload.lastName,
      email: payload.email,
      isOAuthUser: 'true',
      tel: 'null',
      password: 'null',
    };
    const entity = await this.authRepo.createAuthRegister(registerEntity);
    return authModelSchema.parse(entity);
  }

  async register(payload: RegisterUserDTO): Promise<AuthModel> {
    const hashedPassword: string = await bcrypt.hash(payload.password, 10);
    const registerEntity: AuthInsertEntity = {
      name: payload.name,
      email: payload.email,
      password: hashedPassword,
      tel: payload.tel,
    };
    const entity = await this.authRepo.createAuthRegister(registerEntity);
    return authModelSchema.parse(entity);
  }

  async findAuthOneByEmail(email: string): Promise<AuthModel | null> {
    const entity = await this.authRepo.findAuthByEmail(email);
    if (!entity) {
      return null;
    }
    return authModelSchema.parse(entity);
  }
}
