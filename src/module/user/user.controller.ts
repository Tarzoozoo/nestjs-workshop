import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  ParseUUIDPipe,
  HttpStatus,
  UseGuards,
  Req,
} from '@nestjs/common';
import { UserService } from './user.service';
import {
  CreateUserDto,
  UpdateUserDto,
  CreateRegisterUserDto,
} from './user.dto';
import { ResponseDto } from '@/common/dto/response.dto';
import { ApiOperation } from '@nestjs/swagger';
import { JwtAuthGuard } from '@/common/gards/jwt.auth.guard';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @ApiOperation({ summary: 'Find all users' })
  async findAll() {
    const response = await this.userService.findAll();
    return new ResponseDto({
      code: HttpStatus.OK,
      message: 'Find all users successfully',
      data: response,
    });
  }

  // JWT protected route
  @UseGuards(JwtAuthGuard)
  @Get('profile')
  @ApiOperation({ summary: 'Get user profile' })
  async getProfile(@Req() req) {
    const userInfo = await this.userService.findAuthOneByEmail(req.user.email);
    return new ResponseDto({
      code: HttpStatus.OK,
      message: 'Get user information successfully',
      data: userInfo,
    });
  }

  @Get(':userId')
  @ApiOperation({ summary: 'Find user by ID' })
  async findOne(@Param('userId', ParseUUIDPipe) userId: string) {
    const response = await this.userService.findOne(userId);
    return new ResponseDto({
      code: HttpStatus.OK,
      message: 'Find user successfully',
      data: response,
    });
  }

  @Post()
  @ApiOperation({ summary: 'Create user' })
  async create(@Body() body: CreateUserDto) {
    const response = await this.userService.create(body);
    return new ResponseDto({
      code: HttpStatus.CREATED,
      message: 'User created successfully',
      data: response,
    });
  }

  @Put(':userId')
  @ApiOperation({ summary: 'Update user' })
  async update(
    @Param('userId', ParseUUIDPipe) userId: string,
    @Body() body: UpdateUserDto,
  ) {
    const response = await this.userService.update(userId, body);
    return new ResponseDto({
      code: HttpStatus.OK,
      message: 'User updated successfully',
      data: response,
    });
  }

  @Delete(':userId')
  @ApiOperation({ summary: 'Delete user' })
  async remove(@Param('userId', ParseUUIDPipe) userId: string) {
    const response = await this.userService.remove(userId);
    return new ResponseDto({
      code: HttpStatus.OK,
      message: 'User deleted successfully',
      data: response,
    });
  }

  // Register endpoint
  @Post('register')
  @ApiOperation({ summary: 'Register user' })
  async register(@Body() body: CreateRegisterUserDto) {
    const existingUser = await this.userService.findAuthOneByEmail(body.email);
    if (existingUser) {
      return new ResponseDto({
        code: HttpStatus.CONFLICT,
        message: 'Email already in use',
        data: null,
      });
    }
    const response = await this.userService.register(body);
    return new ResponseDto({
      code: HttpStatus.CREATED,
      message: 'User registered successfully',
      data: response,
    });
  }
}
