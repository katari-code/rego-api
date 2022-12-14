import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { RolesGuard } from '../auth/guards/roles.guard';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { StatusGuard } from '../auth/guards/status.guard';
import { ProductQueryDto } from './dto/query.dto';
import { PaginationQueryDto } from '../util/query.dto';
import { Product } from '@prisma/client';

@Controller({ path: 'product', version: '1' })
@UseGuards(JwtAuthGuard, RolesGuard, StatusGuard)
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  create(@Body() createProductDto: CreateProductDto): Promise<Product> {
    return this.productService.create(createProductDto);
  }
  @Get()
  findMany(
    @Query() productQueryDto: ProductQueryDto,
    @Query() paginationQueryDto: PaginationQueryDto,
  ) {
    return this.productService.findMany(productQueryDto, paginationQueryDto);
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<Product> {
    return this.productService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: number,
    @Body() updateProductDto: UpdateProductDto,
  ): Promise<Product> {
    return this.productService.update(id, updateProductDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number): Promise<Product> {
    return this.productService.remove(id);
  }
}
