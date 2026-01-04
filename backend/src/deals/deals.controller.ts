import { Controller, Get, Post, Put, Delete, Param, Body, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { DealsService } from './deals.service';
import { Deal } from './deal.entity';

@Controller('deals')
export class DealsController {
  constructor(private service: DealsService) {}

  @Get()
  findAll(): Promise<Deal[]> {
    return this.service.findAll();
  }

  @Get('stats')
  getStats(): Promise<any> {
    return this.service.getStats();
  }

  @Get(':id')
  findById(@Param('id') id: string): Promise<Deal> {
    return this.service.findById(id);
  }

  @Post()
  @UseGuards(AuthGuard('jwt'))
  create(@Body() data: Partial<Deal>): Promise<Deal> {
    return this.service.create(data);
  }

  @Put(':id')
  @UseGuards(AuthGuard('jwt'))
  update(@Param('id') id: string, @Body() data: Partial<Deal>): Promise<Deal> {
    return this.service.update(id, data);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  delete(@Param('id') id: string): Promise<void> {
    return this.service.delete(id);
  }
}

BACKEND - MODULE PAYMENTS