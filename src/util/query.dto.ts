import { Type } from '@nestjs/class-transformer';
import { IsOptional } from 'class-validator';

export class PaginationQueryDto {
  @IsOptional()
  @Type(() => Number)
  skip: number;

  @IsOptional()
  @Type(() => Number)
  take: number;
}
