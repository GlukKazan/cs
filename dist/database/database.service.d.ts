import OracleDB from 'oracledb';
export declare class DatabaseService {
    connection: OracleDB.Connection | null;
    getByQuery<T>(query: string, params: Array<string | number>): Promise<OracleDB.Result<T>>;
    onApplicationBootstrap(): Promise<void>;
    onApplicationShutdown(): Promise<void>;
}
