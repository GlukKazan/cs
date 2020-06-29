import { Controller, Res, Body, HttpStatus, Post } from '@nestjs/common';
import { CheckService } from './check.service';
import { Check } from 'src/interfaces/check.interface';
import { ApiBody, ApiOkResponse, ApiInternalServerErrorResponse, ApiNotFoundResponse } from '@nestjs/swagger';

@Controller('check')
export class CheckController {

    constructor(
        private readonly service: CheckService
    ) {}

    @Post()
    @ApiBody({ type: [Check] })
    @ApiOkResponse({ description: 'Successfully.'})
    @ApiNotFoundResponse({ description: 'Not Found.'})
    @ApiInternalServerErrorResponse({ description: 'Internal Server error.'})
    async check(@Res() res, @Body() x: Check): Promise<Check> {
        try {
            const r = await this.service.check(x);
            if (!r) {
                return res.status(HttpStatus.NOT_FOUND).json();
            } else {
                return res.status(HttpStatus.OK).json(r);
            }
        } catch (e) {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: e.message.error.toString(), stack: e.stack});
        }
    }
}
