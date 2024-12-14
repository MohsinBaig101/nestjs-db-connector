import { LoggerProvider } from "./LoggerProviders";
import { DynamicModule, Global } from '@nestjs/common';
// import {createLogger} from 'winston';


export class CustomLogger {
    static forRoot({ isGlobal }: { isGlobal?: boolean } = {}): DynamicModule {
        return {
            module: CustomLogger,
            providers: [LoggerProvider, {
                provide: 'LoggerProvider',
                useFactory: (config: LoggerProvider) => {
                    return config.getInstance();
                },
                inject: [LoggerProvider],
            }],
            exports: [LoggerProvider, {
                provide: 'LoggerProvider',
                useFactory: (config: LoggerProvider) => {
                    return config.getInstance();
                },
                inject: [LoggerProvider],
            }],
            global: isGlobal || false
        };
    }
}