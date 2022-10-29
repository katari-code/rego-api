import { Injectable, OnModuleInit } from '@nestjs/common';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { ModuleRef } from '@nestjs/core';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService implements OnModuleInit {
  private userService: UserService;
  constructor(private moduleRef: ModuleRef, private jwtService: JwtService) {}
  onModuleInit() {
    this.userService = this.moduleRef.get(UserService, { strict: false });
  }

  async validateUser(email: string, password: string): Promise<User | boolean> {
    const user = await this.userService.getUserByEmail(email);
    if (!user) {
      return false;
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return false;
    }
    return user;
  }
  async login(user: User): Promise<{ access_token: string }> {
    const payload = {
      email: user.email,
      role: user.role,
      status: user.status,
      sub: user.id,
    };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async register(user: CreateUserDto): Promise<{ access_token: string }> {
    const salt = await bcrypt.genSalt();
    user.password = await bcrypt.hash(user.password, salt);
    const newUser = await this.userService.create(user);
    return this.login(newUser);
  }
}
