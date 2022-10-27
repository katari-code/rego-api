import { Transform } from 'class-transformer';
import { IsBoolean, isEmpty, IsOptional } from 'class-validator';

export class ProductQueryDto {
  @IsBoolean()
  @IsOptional()
  @Transform(({ value }) =>
    isEmpty(value)
      ? true
      : value === 'true'
      ? true
      : value === 'false'
      ? false
      : value,
  )
  warehouse?: boolean = false;
}
