import { Controller, Get, Post, Put, Delete, Param, Body, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CreatorsService } from './creators.service';
import { Creator } from './creator.entity';

@Controller('creators')
export class CreatorsController {
  constructor(private service: CreatorsService) {}

  @Get()
  findAll(): Promise<Creator[]> {
    return this.service.findAll();
  }

  @Get(':id')
  findById(@Param('id') id: string): Promise<Creator> {
    return this.service.findById(id);
  }

  @Post()
  @UseGuards(AuthGuard('jwt'))
  create(@Body() data: Partial<Creator>): Promise<Creator> {
    return this.service.create(data);
  }

  @Put(':id')
  @UseGuards(AuthGuard('jwt'))
  update(@Param('id') id: string, @Body() data: Partial<Creator>): Promise<Creator> {
    return this.service.update(id, data);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  delete(@Param('id') id: string): Promise<void> {
    return this.service.delete(id);
  }
}
