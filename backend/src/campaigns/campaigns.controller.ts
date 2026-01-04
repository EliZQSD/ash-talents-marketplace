import { Controller, Get, Post, Put, Delete, Param, Body, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CampaignsService } from './campaigns.service';
import { Campaign } from './campaign.entity';

@Controller('campaigns')
export class CampaignsController {
  constructor(private service: CampaignsService) {}

  @Get()
  findAll(): Promise<Campaign[]> {
    return this.service.findAll();
  }

  @Get('active')
  findActive(): Promise<Campaign[]> {
    return this.service.findActive();
  }

  @Get(':id')
  findById(@Param('id') id: string): Promise<Campaign> {
    return this.service.findById(id);
  }

  @Post()
  @UseGuards(AuthGuard('jwt'))
  create(@Body() data: Partial<Campaign>): Promise<Campaign> {
    return this.service.create(data);
  }

  @Put(':id')
  @UseGuards(AuthGuard('jwt'))
  update(@Param('id') id: string, @Body() data: Partial<Campaign>): Promise<Campaign> {
    return this.service.update(id, data);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  delete(@Param('id') id: string): Promise<void> {
    return this.service.delete(id);
  }
}
