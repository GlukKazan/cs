import { Injectable } from '@nestjs/common';
import OracleDB = require('oracledb');

@Injectable()
export class AppService {

  async getHello(): Promise<string> {
    const s = await this.testDB();
    return 'Hello ' + s;
  }

  async testDB(): Promise<string> {
    let connection;
    let result;
    try {
      connection = await OracleDB.getConnection( {
        user          : "billing",
        password      : "billing",
        connectString : "WHISKEY"
      });
      result = await connection.execute(
        `SELECT :id + 1 as result from dual`,
        [41],  // bind value for :id
      );
      console.log(result);
    } catch (error) {
      console.log(error);
    } finally {
      if (connection) {
        try {
          await connection.close();
        } catch (err) {
          console.error(err);
        }
      }      
    }
    return result.rows[0][0];
  }
}
