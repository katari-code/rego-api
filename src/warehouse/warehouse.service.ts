import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Warehouse } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { PaginationQueryDto } from '../util/query.dto';
import { CreateWarehouseDto } from './dto/create-warehouse.dto';
import { WarehouseQueryDto } from './dto/query.dto';
import { UpdateWarehouseDto } from './dto/update-warehouse.dto';

@Injectable()
export class WarehouseService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createWarehouseDto: CreateWarehouseDto): Promise<Warehouse> {
    return this.prismaService.warehouse.create({ data: createWarehouseDto });
  }
  async findMany(
    paginationQueryDto?: PaginationQueryDto,
    warehouseQueryDto?: WarehouseQueryDto,
  ): Promise<Warehouse[]> {
    return this.prismaService.warehouse.findMany({
      skip: (paginationQueryDto && paginationQueryDto.skip) ?? undefined,
      take: (paginationQueryDto && paginationQueryDto.take) ?? undefined,
      include: { products: warehouseQueryDto && warehouseQueryDto.products },
    });
  }

  async findOne(id: number): Promise<Warehouse> {
    return this.prismaService.warehouse.findUnique({ where: { id } });
  }

  async update(
    id: number,
    updateeWarehouseDto: UpdateWarehouseDto,
  ): Promise<Warehouse> {
    return this.prismaService.warehouse.update({
      data: updateeWarehouseDto,
      where: { id },
    });
  }

  async remove(id: number): Promise<Warehouse> {
    try {
      return this.prismaService.warehouse.delete({ where: { id } });
    } catch (err) {
      throw new HttpException('Forbidden', HttpStatus.BAD_REQUEST);
    }
  }
}
