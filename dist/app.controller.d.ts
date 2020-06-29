/// <reference types="oracledb" />
import { DatabaseService } from './database/database.service';
export declare class AppController {
    private readonly DatabaseService;
    constructor(DatabaseService: DatabaseService);
    getHello(): Promise<import("oracledb").Result<string>>;
}
