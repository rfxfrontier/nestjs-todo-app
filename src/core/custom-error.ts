export class CustomError extends Error {
    errorMsg: string;
    statusCode: number;
    metadata: any;
    constructor(errorMsg: string, statusCode: number, metadata?: any) {
        super(errorMsg);
        this.name = 'CustomError';
        this.errorMsg = errorMsg;
        this.statusCode = statusCode;
        this.metadata = metadata;
    }
}
