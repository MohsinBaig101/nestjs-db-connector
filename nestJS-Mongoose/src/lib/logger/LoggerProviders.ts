import { Injectable, Scope } from '@nestjs/common';
import * as winston from 'winston';
import { WinstonService } from './winstonService';

@Injectable({
    scope: Scope.TRANSIENT,
})
export class LoggerProvider {
    private _winston;
    constructor() {
        this._winston = WinstonService.getInstance();
    }
    public getInstance() {
        return this._winston;
    }
}

// export const LoggerProvider = 