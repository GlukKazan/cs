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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CheckController = void 0;
const common_1 = require("@nestjs/common");
const check_service_1 = require("./check.service");
const check_interface_1 = require("../interfaces/check.interface");
const swagger_1 = require("@nestjs/swagger");
let CheckController = class CheckController {
    constructor(service) {
        this.service = service;
    }
    async check(res, x) {
        try {
            const r = await this.service.check(x);
            if (!r) {
                return res.status(common_1.HttpStatus.NOT_FOUND).json();
            }
            else {
                return res.status(common_1.HttpStatus.OK).json(r);
            }
        }
        catch (e) {
            return res.status(common_1.HttpStatus.INTERNAL_SERVER_ERROR).json({ error: e.message.error.toString(), stack: e.stack });
        }
    }
};
__decorate([
    common_1.Post(),
    swagger_1.ApiBody({ type: [check_interface_1.Check] }),
    swagger_1.ApiOkResponse({ description: 'Successfully.' }),
    swagger_1.ApiNotFoundResponse({ description: 'Not Found.' }),
    swagger_1.ApiInternalServerErrorResponse({ description: 'Internal Server error.' }),
    __param(0, common_1.Res()), __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, check_interface_1.Check]),
    __metadata("design:returntype", Promise)
], CheckController.prototype, "check", null);
CheckController = __decorate([
    common_1.Controller('check'),
    __metadata("design:paramtypes", [check_service_1.CheckService])
], CheckController);
exports.CheckController = CheckController;
//# sourceMappingURL=check.controller.js.map