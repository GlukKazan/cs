import { Injectable, InternalServerErrorException, HttpStatus } from '@nestjs/common';
import { Check } from 'src/interfaces/check.interface';
import OracleDB = require('oracledb');
import { appConstants } from './constants';

@Injectable()
export class CheckService {

    async getConnection(): Promise<OracleDB.Connection> {
        return await OracleDB.getConnection( {
            user          : appConstants.db_user,
            password      : appConstants.db_password,
            connectString : appConstants.db_host + ":" + appConstants.db_port + "/" + appConstants.db_service
        });
    }

    async freeConnection(connection: OracleDB.Connection) {
        await connection.close();
    }

    async getAccount(connection: OracleDB.Connection, msisdn: string): Promise<number> {
        const result = await connection.execute(
            `select ID from CUSTOMER where MSISDN = :msisdn`, [msisdn]
        );
        if (!result.rows || result.rows.length == 0) {
            return null;
        }
        return result.rows[0][0];
    }

    async getStatus(connection: OracleDB.Connection, account: number): Promise<number> {
        const result = await connection.execute(
            `select STATUS from CUSTOMER where ID = :id`, [account]
        );
        if (!result.rows || result.rows.length == 0) {
            return null;
        }
        return result.rows[0][0];
    }

    async check(x: Check): Promise<Check> {
        let connection: OracleDB.Connection;
        try {
            connection = await this.getConnection();
            x.status = false;
            x.account = await this.getAccount(connection, x.msisdn);
            if (x.account) {
                const status = await this.getStatus(connection, x.account);
                if (status == appConstants.customer_active) {
                    x.status = true;
                }
                return x;
            } else {
                return null;
            }
        } catch (error) {
            console.error(error);
            throw new InternalServerErrorException({
                status: HttpStatus.BAD_REQUEST,
                error: error
            });
        } finally {
            if (connection) {
                await this.freeConnection(connection);
            }
        }
    }
}
