import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
  ParseIntPipe,
} from '@nestjs/common';
import { WarehouseService } from './warehouse.service';
import { CreateWarehouseDto } from './dto/create-warehouse.dto';
import { UpdateWarehouseDto } from './dto/update-warehouse.dto';
import { PaginationQueryDto } from '../util/query.dto';
import { WarehouseQueryDto } from './dto/query.dto';
import { Warehouse } from '@prisma/client';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { StatusGuard } from '../auth/guards/status.guard';

@Controller({ path: 'warehouse', version: '1' })
@UseGuards(JwtAuthGuard, RolesGuard, StatusGuard)
export class WarehouseController {
  constructor(private readonly warehouseService: WarehouseService) {}

  @Post()
  create(@Body() createWarehouseDto: CreateWarehouseDto): Promise<Warehouse> {
    return this.warehouseService.create(createWarehouseDto);
  }
  @Get()
  findMany(
    @Query() warehouseQueryDto?: WarehouseQueryDto,
    @Query() paginationQueryDto?: PaginationQueryDto,
  ): Promise<Warehouse[]> {
    return this.warehouseService.findMany();
  }
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<Warehouse> {
    return this.warehouseService.findOne(+id);
  }
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateWarehouseDto: UpdateWarehouseDto,
  ): Promise<Warehouse> {
    return this.warehouseService.update(+id, updateWarehouseDto);
  }
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number): Promise<Warehouse> {
    return this.warehouseService.remove(+id);
  }
}
