import OracleDB from 'oracledb';
import { Injectable } from '@nestjs/common';

@Injectable()
export class DatabaseService {
  connection: OracleDB.Connection | null = null;

  async getByQuery<T>(
    query: string, 
    params: Array<string | number>
  ): Promise<OracleDB.Result<T>> {
    return await this.connection.execute(query, params);
  }

  async onApplicationBootstrap() {
    try {
      this.connection = await OracleDB.getConnection( {
        user: "YOTA_TEST",
        password: "YOTA_TEST",
        connectString: "10.67.192.12:1521/porridge"
      });
    } catch (error) {
      console.log(error);
    }
  }

  async onApplicationShutdown() {
    if (this.connection) {
      try {
        await this.connection.close();
      } catch (error) {
        console.error(error);
      }
    }
  }
}
