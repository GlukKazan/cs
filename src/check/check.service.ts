import { Injectable, InternalServerErrorException, HttpStatus } from '@nestjs/common';
import { Check } from 'src/interfaces/check.interface';
import { DatabaseService } from '../database/database.service';
import { appConstants } from './constants';

@Injectable()
export class CheckService {
    constructor(private readonly database: DatabaseService) {}

    async getAccount(msisdn: string): Promise<number> {
        const result = await this.database.getByQuery(
            `select ID from CUSTOMER where MSISDN = :msisdn`, [msisdn]
        );
        if (!result.rows || result.rows.length == 0) {
            return null;
        }
        return result.rows[0][0];
    }

    async getStatus(account: number): Promise<number> {
        const result = await this.database.getByQuery(
            `select STATUS from CUSTOMER where ID = :id`, [account]
        );
        if (!result.rows || result.rows.length == 0) {
            return null;
        }
        return result.rows[0][0];
    }

    async check(x: Check): Promise<Check> {
        try {
            x.status = false;
            x.account = await this.getAccount(x.msisdn);
            if (x.account) {
                const status = await this.getStatus(x.account);
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
        }  
    }
}
