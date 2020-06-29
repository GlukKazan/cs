"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CheckService = void 0;
const common_1 = require("@nestjs/common");
const check_interface_1 = require("../interfaces/check.interface");
const database_service_1 = require("../database/database.service");
const constants_1 = require("./constants");
let CheckService = class CheckService {
    constructor(database) {
        this.database = database;
    }
    async getAccount(msisdn) {
        const result = await this.database.getByQuery(`select ID from CUSTOMER where MSISDN = :msisdn`, [msisdn]);
        if (!result.rows || result.rows.length == 0) {
            return null;
        }
        return result.rows[0][0];
    }
    async getStatus(account) {
        const result = await this.database.getByQuery(`select STATUS from CUSTOMER where ID = :id`, [account]);
        if (!result.rows || result.rows.length == 0) {
            return null;
        }
        return result.rows[0][0];
    }
    async check(x) {
        try {
            x.status = false;
            x.account = await this.getAccount(x.msisdn);
            if (x.account) {
                const status = await this.getStatus(x.account);
                if (status == constants_1.appConstants.customer_active) {
                    x.status = true;
                }
                return x;
            }
            else {
                return null;
            }
        }
        catch (error) {
            console.error(error);
            throw new common_1.InternalServerErrorException({
                status: common_1.HttpStatus.BAD_REQUEST,
                error: error
            });
        }
    }
};
CheckService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [database_service_1.DatabaseService])
], CheckService);
exports.CheckService = CheckService;
//# sourceMappingURL=check.service.js.map