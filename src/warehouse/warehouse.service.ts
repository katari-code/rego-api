import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { PaginationQueryDto } from 'src/util/query.dto';
import { CreateWarehouseDto } from './dto/create-warehouse.dto';
import { WarehouseQueryDto } from './dto/query.dto';
import { UpdateWarehouseDto } from './dto/update-warehouse.dto';

@Injectable()
export class WarehouseService {
  constructor(private readonly prismaService: PrismaService) {}

  create(createWarehouseDto: CreateWarehouseDto) {
    return this.prismaService.warehouse.create({ data: createWarehouseDto });
  }
  findMany(
    paginationQueryDto: PaginationQueryDto,
    warehouseQueryDto: WarehouseQueryDto,
  ) {
    return this.prismaService.warehouse.findMany({
      skip: paginationQueryDto.skip ?? undefined,
      take: paginationQueryDto.take ?? undefined,
      include: { products: warehouseQueryDto.products },
    });
  }

  findOne(id: number) {
    return this.prismaService.warehouse.findUnique({ where: { id } });
  }

  update(id: number, updateeWarehouseDto: UpdateWarehouseDto) {
    this.prismaService.warehouse.update({
      data: updateeWarehouseDto,
      where: { id },
    });
  }

  remove(id: number) {
    return this.prismaService.warehouse.delete({ where: { id } });
  }
}
