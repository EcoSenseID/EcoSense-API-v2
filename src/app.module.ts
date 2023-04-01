import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { CampaignsModule } from './campaigns/campaigns.module';
import { NewsModule } from './news/news.module';
import { RewardsModule } from './rewards/rewards.module';
import { CategoriesModule } from './categories/categories.module';
import { FirebaseStrategy } from './auth/strategy';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    CampaignsModule,
    NewsModule,
    RewardsModule,
    CategoriesModule,
  ],
  controllers: [AppController],
  providers: [FirebaseStrategy],
})
export class AppModule {}
