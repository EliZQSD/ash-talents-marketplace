import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Deal } from './deal.entity';

@Injectable()
export class DealsService {
  constructor(
    @InjectRepository(Deal)
    private repo: Repository<Deal>,
  ) {}

  async create(data: Partial<Deal>): Promise<Deal> {
    return this.repo.save(this.repo.create(data));
  }

  async findAll(): Promise<Deal[]> {
    return this.repo.find();
  }

  async findById(id: string): Promise<Deal> {
    return this.repo.findOne({ where: { id } });
  }

  async getStats(): Promise<any> {
    const total = await this.repo.count();
    const completed = await this.repo.count({ where: { status: 'completed' } });
    const deals = await this.repo.find();
    const revenue = deals.reduce((sum, deal) => sum + deal.amount, 0);
    return { total, completed, revenue };
  }

  async update(id: string, data: Partial<Deal>): Promise<Deal> {
    await this.repo.update(id, data);
    return this.findById(id);
  }

  async delete(id: string): Promise<void> {
    await this.repo.delete(id);
  }
}