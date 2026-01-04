import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Brand } from './brand.entity';

@Injectable()
export class BrandsService {
  constructor(
    @InjectRepository(Brand)
    private repo: Repository<Brand>,
  ) {}

  async create(data: Partial<Brand>): Promise<Brand> {
    return this.repo.save(this.repo.create(data));
  }

  async findAll(): Promise<Brand[]> {
    return this.repo.find();
  }

  async findById(id: string): Promise<Brand> {
    return this.repo.findOne({ where: { id } });
  }

  async update(id: string, data: Partial<Brand>): Promise<Brand> {
    await this.repo.update(id, data);
    return this.findById(id);
  }

  async delete(id: string): Promise<void> {
    await this.repo.delete(id);
  }
}