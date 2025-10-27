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
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto, UpdateUserDto } from './user.dto';
import { ResponseDto } from '@/common/dto/response.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async findAll() {
    const response = await this.userService.findAll();
    return new ResponseDto({
      code: HttpStatus.OK,
      message: 'Find all users successfully',
      data: response,
    });
  }

  @Get(':userId')
  async findOne(@Param('userId', ParseUUIDPipe) userId: string) {
    const response = await this.userService.findOne(userId);
    console.log(response);
    return new ResponseDto({
      code: HttpStatus.OK,
      message: 'Find user successfully',
      data: response,
    });
  }

  @Post()
  async create(@Body() body: CreateUserDto) {
    const response = await this.userService.create(body);
    return new ResponseDto({
      code: HttpStatus.CREATED,
      message: 'User created successfully',
      data: response,
    });
  }

  @Put(':userId')
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
  async remove(@Param('userId', ParseUUIDPipe) userId: string) {
    const response = await this.userService.remove(userId);
    return new ResponseDto({
      code: HttpStatus.OK,
      message: 'User deleted successfully',
      data: response,
    });
  }
}
