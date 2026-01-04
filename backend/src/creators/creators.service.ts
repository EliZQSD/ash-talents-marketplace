import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Creator } from './creator.entity';

@Injectable()
export class CreatorsService {
  constructor(
    @InjectRepository(Creator)
    private repo: Repository<Creator>,
  ) {}

  async create(data: Partial<Creator>): Promise<Creator> {
    return this.repo.save(this.repo.create(data));
  }

  async findAll(): Promise<Creator[]> {
    return this.repo.find();
  }

  async findById(id: string): Promise<Creator> {
    return this.repo.findOne({ where: { id } });
  }

  async update(id: string, data: Partial<Creator>): Promise<Creator> {
    await this.repo.update(id, data);
    return this.findById(id);
  }

  async delete(id: string): Promise<void> {
    await this.repo.delete(id);
  }
}