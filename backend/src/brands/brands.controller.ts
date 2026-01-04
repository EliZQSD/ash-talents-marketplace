import { Controller, Get, Post, Put, Delete, Param, Body, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { BrandsService } from './brands.service';
import { Brand } from './brand.entity';

@Controller('brands')
export class BrandsController {
  constructor(private service: BrandsService) {}

  @Get()
  findAll(): Promise<Brand[]> {
    return this.service.findAll();
  }

  @Get(':id')
  findById(@Param('id') id: string): Promise<Brand> {
    return this.service.findById(id);
  }

  @Post()
  @UseGuards(AuthGuard('jwt'))
  create(@Body() data: Partial<Brand>): Promise<Brand> {
    return this.service.create(data);
  }

  @Put(':id')
  @UseGuards(AuthGuard('jwt'))
  update(@Param('id') id: string, @Body() data: Partial<Brand>): Promise<Brand> {
    return this.service.update(id, data);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  delete(@Param('id') id: string): Promise<void> {
    return this.service.delete(id);
  }
}

BACKEND - MODULE CAMPAIGNS