import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Status } from '@prisma/client';

@Injectable()
export class StatusGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const userStatus: Status = request.user.status;
    if (userStatus === Status.PENDING)
      throw new UnauthorizedException(`user has ${userStatus} status`);
    return true;
  }
}
