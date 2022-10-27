import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { PaginationQueryDto } from 'src/util/query.dto';
import { CreateProductDto } from './dto/create-product.dto';
import { ProductQueryDto } from './dto/query.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductService {
  constructor(private readonly prismaService: PrismaService) {}
  create(createProductDto: CreateProductDto) {
    return this.prismaService.product.create({ data: createProductDto });
  }

  findMany(
    productQueryDto: ProductQueryDto,
    paginationQueryDto: PaginationQueryDto,
  ) {
    return this.prismaService.product.findMany({
      skip: paginationQueryDto.skip ?? undefined,
      take: paginationQueryDto.take ?? undefined,
      include: { warehouse: productQueryDto.warehouse },
    });
  }

  findOne(id: number) {
    return this.prismaService.product.findUnique({ where: { id } });
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return this.prismaService.product.update({
      data: updateProductDto,
      where: { id },
    });
  }

  remove(id: number) {
    return this.prismaService.product.delete({ where: { id } });
  }
}
