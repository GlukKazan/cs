"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatabaseService = void 0;
const oracledb_1 = __importDefault(require("oracledb"));
const common_1 = require("@nestjs/common");
let DatabaseService = class DatabaseService {
    constructor() {
        this.connection = null;
    }
    async getByQuery(query, params) {
        return await this.connection.execute(query, params);
    }
    async onApplicationBootstrap() {
        try {
            this.connection = await oracledb_1.default.getConnection({
                user: "YOTA_TEST",
                password: "YOTA_TEST",
                connectString: "10.67.192.12:1521/porridge"
            });
        }
        catch (error) {
            console.log(error);
        }
    }
    async onApplicationShutdown(signal) {
        if (this.connection) {
            try {
                await this.connection.close();
            }
            catch (error) {
                console.error(error);
            }
        }
    }
};
DatabaseService = __decorate([
    common_1.Injectable()
], DatabaseService);
exports.DatabaseService = DatabaseService;
//# sourceMappingURL=database.service.js.map