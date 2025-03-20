import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { ExpertModule } from './expert/expert.module';
import { ClientModule } from './client/client.module';
import { MatchModule } from './match/match.module';

@Module({
  imports: [PrismaModule, ExpertModule, ClientModule, MatchModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
