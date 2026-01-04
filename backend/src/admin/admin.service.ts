import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Creator } from '../creators/creator.entity';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(Creator)
    private creatorsRepository: Repository<Creator>,
  ) {}

  async getStats() {
    const totalCreators = await this.creatorsRepository.count();
    
    // Mock data for now - will be replaced with real data
    return {
      totalCreators,
      totalBrands: 0,
      activeDeals: 0,
      revenue: 0
    };
  }
}
