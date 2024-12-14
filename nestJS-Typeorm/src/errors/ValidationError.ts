import {
    errorMessages
} from '../constants/errorMessages';
export class CustomValidationError extends Error {
    private errorCode: number;
    public message: string;
    public error: any;
    public statusCode: number;

    constructor(errMessage: string, error: any) {
        super()
        this.errorCode = errorMessages[errMessage]?.code;
        this.message = errorMessages[errMessage]?.message;
        this.statusCode = errorMessages[errMessage]?.statusCode;
        this.error = error;
    }
    public get getStatusCode(): number { return this.statusCode }
    public get getMessage(): string { return this.message }
    public get getErrorCode(): number { return this.errorCode }
    public get getError(): any { return this.error }
}