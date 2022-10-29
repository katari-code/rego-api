import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { StatusGuard } from '../auth/guards/status.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { RoleDec } from '../auth/decorator/role.decorator';
import { Role, User } from '@prisma/client';

@Controller({ path: 'user', version: '1' })
@UseGuards(JwtAuthGuard, RolesGuard, StatusGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}
  @RoleDec(Role.ADMIN)
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }
  @RoleDec(Role.ADMIN)
  @Get()
  findAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  @RoleDec(Role.ADMIN)
  @Get(':id')
  findOne(@Param('id') id: string): Promise<User> {
    return this.userService.findOne(+id);
  }

  @RoleDec(Role.ADMIN)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<User> {
    return this.userService.update(+id, updateUserDto);
  }

  @RoleDec(Role.ADMIN)
  @Delete(':id')
  remove(@Param('id') id: string): Promise<User> {
    return this.userService.remove(+id);
  }
}
