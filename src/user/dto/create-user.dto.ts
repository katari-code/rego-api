import { Role, Status } from '@prisma/client';
import { IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  role: Role;

  @IsNotEmpty()
  status: Status;
}
