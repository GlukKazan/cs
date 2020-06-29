import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CheckModule } from './check/check.module';
import { DatabaseService } from './database/database.service';

@Module({
  imports: [CheckModule],
  controllers: [AppController],
  providers: [AppService, DatabaseService],
})
export class AppModule {}
