import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CreatorsService } from './creators.service';
import { CreatorsController } from './creators.controller';
import { Creator } from './creator.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Creator])],
  providers: [CreatorsService],
  controllers: [CreatorsController],
  exports: [CreatorsService],
})
export class CreatorsModule {}