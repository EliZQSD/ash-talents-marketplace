import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { Creator } from '../creators/creator.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Creator])],
  controllers: [AdminController],
  providers: [AdminService],
})
export class AdminModule {}
