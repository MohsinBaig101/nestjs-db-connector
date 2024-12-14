import {
    errorMessages
} from '../constants/errorMessages';
export class UnAuthorizedError extends Error {
    private errorCode: number;
    public message: string;
    public statusCode: number;

    constructor(errMessage: string) {
        super()
        this.errorCode = errorMessages[errMessage]?.code;
        this.message = errorMessages[errMessage]?.message;
        this.statusCode = errorMessages[errMessage]?.statusCode;
    }
    public get getStatusCode(): number { return this.statusCode }
    public get getMessage(): string { return this.message }
    public get getErrorCode(): number { return this.errorCode }
}