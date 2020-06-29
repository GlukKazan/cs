import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseService } from './database/database.service';
import { CheckModule } from './check/check.module';

@Module({
  imports: [CheckModule],
  controllers: [AppController],
  providers: [AppService, DatabaseService],
})
export class AppModule {}
