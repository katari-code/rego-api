import {
  ArrayMinSize,
  IsArray,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';

export class CreateProductDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsNumber()
  price: number;

  @IsNotEmpty()
  @IsNumber()
  quantity: number;

  @IsArray()
  @IsString({ each: true })
  @ArrayMinSize(1)
  imges: string[];

  @IsNotEmpty()
  @IsInt()
  warehouseId: number;
}
