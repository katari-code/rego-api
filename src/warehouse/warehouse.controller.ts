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
import { WarehouseService } from './warehouse.service';
import { CreateWarehouseDto } from './dto/create-warehouse.dto';
import { UpdateWarehouseDto } from './dto/update-warehouse.dto';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { StatusGuard } from '../auth/guards/status.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { PaginationQueryDto } from '../util/query.dto';
import { WarehouseQueryDto } from './dto/query.dto';

@Controller({ path: 'warehouse', version: '1' })
@UseGuards(JwtAuthGuard, RolesGuard, StatusGuard)
export class WarehouseController {
  constructor(private readonly warehouseService: WarehouseService) {}

  @UseGuards(JwtAuthGuard, RolesGuard, StatusGuard)
  @Post()
  create(@Body() createWarehouseDto: CreateWarehouseDto) {
    return this.warehouseService.create(createWarehouseDto);
  }
  @Get()
  findMany(
    @Query() warehouseQueryDto: WarehouseQueryDto,
    @Query() paginationQueryDto: PaginationQueryDto,
  ) {
    return this.warehouseService.findMany(
      paginationQueryDto,
      warehouseQueryDto,
    );
  }
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.warehouseService.findOne(+id);
  }
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateWarehouseDto: UpdateWarehouseDto,
  ) {
    return this.warehouseService.update(+id, updateWarehouseDto);
  }
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.warehouseService.remove(+id);
  }
}
