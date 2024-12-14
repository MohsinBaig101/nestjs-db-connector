import { Injectable, Scope } from '@nestjs/common';
import * as winston from 'winston';

export class WinstonService {
    private _winston: winston.Logger;

    constructor() {
        this._winston = winston.createLogger({
            // level: level,
            format: winston.format.json(),
            transports: [
                //
                // - Write all logs with importance level of `error` or less to `error.log`
                // - Write all logs with importance level of `info` or less to `combined.log`
                //
                new winston.transports.Console({
                    format: winston.format.simple(),
                })
                // new winston.transports.File({ filename: 'error.log', level: 'error' }),
                // new winston.transports.File({ filename: 'combined.log' }),
            ],
        })
    }
    public static getInstance() {
        try {
            return new WinstonService();
        } catch (err) {
            console.log(err);
        }
    }
    public child(prams: object) {
        console.log(prams)
        return this._winston.child(prams);
    }
    public info(...args: any[]): any {
        return this._winston.info(args);
    }
}

// export const LoggerProvider = 