import { Controller, Get } from '@nestjs/common';
import { DatabaseService } from './database/database.service';

@Controller()
export class AppController {
  constructor(private readonly DatabaseService: DatabaseService) {}

  @Get()
  async getHello() {
    return await this.DatabaseService.getByQuery<string>(
      `SELECT :id + 1 as result from dual`,
      [41],
    );
  }
}
