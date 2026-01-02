import {
  Controller,
  Post,
  Request,
  UseGuards,
  HttpStatus,
  Body,
  Get,
  Req,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthUserInfo } from './auth.model';
import { LocalAuthGuard } from '@/common/gards/local.auth.guard';
import { ResponseDto } from '@/common/dto/response.dto';
import { Public } from '@/common/decorators/public.decorator';
import { ApiBody, ApiOperation, ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { RegisterUserDTO } from './auth.dto';
import { any } from 'zod';
import { JwtAuthGuard } from '@/common/gards/jwt.auth.guard';

@Controller('auth')
@ApiTags('Auth Server')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // Register endpoint
  @Post('register')
  @Public()
  @ApiOperation({ summary: 'Register user' })
  @ApiBody({
    type: RegisterUserDTO,
    examples: {
      'example-1': {
        value: {
          name: 'John Doe',
          email: 'john@example.com',
          password: 'password123',
          tel: '0801234567',
        },
      },
    },
  })
  async register(@Body() body: RegisterUserDTO) {
    const existingUser = await this.authService.findAuthOneByEmail(body.email);

    if (existingUser) {
      return new ResponseDto({
        code: HttpStatus.CONFLICT,
        message: 'Email already in use',
        data: null,
      });
    }

    const response = await this.authService.register(body);
    return new ResponseDto({
      code: HttpStatus.CREATED,
      message: 'User registered successfully',
      data: response,
    });
  }

  // Login endpoint protected by LocalAuthGuard (Similar to middleware)
  // If authentication is successful, user info is attached to "req"
  // User POST /auth/login -> LocalAuthGuard -> LocalStrategy -> AuthService -> Controller(login)
  @UseGuards(LocalAuthGuard)
  @Post('login/local')
  @Public()
  @ApiBody({
    type: any,
    examples: {
      'example-1': {
        value: {
          email: 'john@example.com',
          password: 'password123',
        },
      },
    },
  })
  @ApiOperation({
    summary: 'Login with local strategy (email and password)',
  })
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
  @Public()
  @ApiBody({
    type: any,
    examples: {
      'example-1': {
        value: {
          email: 'john@example.com',
          password: 'password123',
        },
      },
    },
  })
  @ApiOperation({
    summary: 'Login with local strategy and get JWT access token',
  })
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

  // JWT protected route
  @UseGuards(JwtAuthGuard)
  @Get('profile')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get user profile' })
  async getProfile(@Req() req) {
    const userInfo = await this.authService.findAuthOneByEmail(req.user.email);
    return new ResponseDto({
      code: HttpStatus.OK,
      message: 'Get user information successfully',
      data: userInfo,
    });
  }
}
