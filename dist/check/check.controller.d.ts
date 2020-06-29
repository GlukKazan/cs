import { CheckService } from './check.service';
import { Check } from 'src/interfaces/check.interface';
export declare class CheckController {
    private readonly service;
    constructor(service: CheckService);
    check(res: any, x: Check): Promise<Check>;
}
