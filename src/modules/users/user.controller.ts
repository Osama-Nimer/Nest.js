import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  UseGuards,
} from '@nestjs/common';
import { GetUserId } from '../../utils/decorators';
import { UserService } from './user.service';
import { AuthGuard } from 'src/Guard/token';

@Controller('api/users')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Get('health')
  healthCheck() {
    return { status: 'ok', message: 'User service is healthy' };
  }


  @Get('me')
  @UseGuards(AuthGuard)
  async findById(@GetUserId('id') id: string) {
    const userId = parseInt(id, 10);
    return this.userService.findById(Number(userId));
  }

  @Get()
  async findAll() {
    return this.userService.findAll();
  }
}
