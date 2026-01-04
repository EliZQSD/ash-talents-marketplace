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

    async importCreatorProfile(url: string, platform: string) {
    // Mock data - simule un scraping réussi
    const handle = url.replace(/^https?:\/\/(www\.)?(instagram|tiktok)\.com\/@?/, '').replace(/\/$/, '');
    
    // Données simulées basées sur le handle
    const mockData = {
      name: handle.charAt(0).toUpperCase() + handle.slice(1),
      bio: `${platform === 'instagram' ? 'Instagram' : 'TikTok'} creator passionate about lifestyle and fashion. Creating content that inspires!`,
      followers: Math.floor(Math.random() * 500000) + 10000,
      engagement: parseFloat((Math.random() * 8 + 2).toFixed(2)),
      profilePictureUrl: `https://i.pravatar.cc/150?u=${handle}`,
      handle: `@${handle}`,
      niche: this.detectNiche(handle),
      platform: platform,
      [platform === 'instagram' ? 'instagramHandle' : 'tiktokHandle']: `@${handle}`,
    };

    return mockData;
  }

  private detectNiche(bio: string): string {
    const niches = {
      fashion: ['fashion', 'style', 'outfit', 'clothes'],
      fitness: ['fitness', 'gym', 'workout', 'health'],
      beauty: ['beauty', 'makeup', 'skincare'],
      food: ['food', 'cooking', 'recipe', 'chef'],
      tech: ['tech', 'coding', 'programming', 'developer'],
      lifestyle: ['lifestyle', 'vlog', 'daily'],
    };

    const bioLower = bio.toLowerCase();
    for (const [niche, keywords] of Object.entries(niches)) {
      if (keywords.some(keyword => bioLower.includes(keyword))) {
        return niche;
      }
    }
    
    return 'lifestyle'; // default
  }
}
