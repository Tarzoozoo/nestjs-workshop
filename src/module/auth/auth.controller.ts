import {
  Controller,
  Post,
  Request,
  UseGuards,
  HttpStatus,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthUserInfo } from './auth.model';
import { LocalAuthGuard } from '@/common/gards/local.auth.guard';
import { ResponseDto } from '@/common/dto/response.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // Login endpoint protected by LocalAuthGuard (Similar to middleware)
  // If authentication is successful, user info is attached to "req"
  // User POST /auth/login -> LocalAuthGuard -> LocalStrategy -> AuthService -> Controller(login)
  @UseGuards(LocalAuthGuard)
  @Post('login/local')
  loginLocal(@Request() req) {
    const usesInfo: AuthUserInfo = {
      id: req.user.id,
      name: req.user.name,
      tel: req.user.tel,
      email: req.user.email,
    };
    return new ResponseDto({
      code: HttpStatus.OK,
      message: 'Login successful',
      data: usesInfo,
    });
  }

  // If local authentication is successful, generate JWT token
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    const usesInfo: AuthUserInfo = {
      id: req.user.id,
      name: req.user.name,
      tel: req.user.tel,
      email: req.user.email,
    };
    const accessToken = await this.authService.login(usesInfo);
    return new ResponseDto({
      code: HttpStatus.OK,
      message: 'Login successful',
      data: {
        access_token: accessToken.access_token,
      },
    });
  }
}
