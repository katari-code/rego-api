import { SetMetadata } from '@nestjs/common';
export const RoleDec = (role: string) => SetMetadata('role', role);
