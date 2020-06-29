import { Check } from 'src/interfaces/check.interface';
import { DatabaseService } from '../database/database.service';
export declare class CheckService {
    private readonly database;
    constructor(database: DatabaseService);
    getAccount(msisdn: string): Promise<number>;
    getStatus(account: number): Promise<number>;
    check(x: Check): Promise<Check>;
}
