import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Campaign } from './campaign.entity';

@Injectable()
export class CampaignsService {
  constructor(
    @InjectRepository(Campaign)
    private repo: Repository<Campaign>,
  ) {}

  async create(data: Partial<Campaign>): Promise<Campaign> {
    return this.repo.save(this.repo.create(data));
  }

  async findAll(): Promise<Campaign[]> {
    return this.repo.find();
  }

  async findById(id: string): Promise<Campaign> {
    return this.repo.findOne({ where: { id } });
  }

  async findActive(): Promise<Campaign[]> {
    return this.repo.find({ where: { status: 'active' } });
  }

  async update(id: string, data: Partial<Campaign>): Promise<Campaign> {
    await this.repo.update(id, data);
    return this.findById(id);
  }

  async delete(id: string): Promise<void> {
    await this.repo.delete(id);
  }
}