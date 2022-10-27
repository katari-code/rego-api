import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) {}
  create(createUserDto: CreateUserDto) {
    return this.prismaService.user.create({ data: createUserDto });
  }

  async getUserByEmail(email: string) {
    console.log(await this.prismaService.user.findUnique({ where: { email } }));
    return this.prismaService.user.findUnique({ where: { email } });
  }

  findAll() {
    return this.prismaService.user.findMany({});
  }

  findOne(id: number) {
    return this.prismaService.user.findUnique({ where: { id } });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    this.prismaService.user.update({ data: updateUserDto, where: { id } });
  }

  remove(id: number) {
    return this.prismaService.user.delete({ where: { id } });
  }
}
