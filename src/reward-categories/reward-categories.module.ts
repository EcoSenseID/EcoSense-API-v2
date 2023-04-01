import { Module } from '@nestjs/common';
import { RewardCategoriesService } from './reward-categories.service';
import { RewardCategoriesController } from './reward-categories.controller';

@Module({
  providers: [RewardCategoriesService],
  controllers: [RewardCategoriesController],
})
export class RewardCategoriesModule {}
