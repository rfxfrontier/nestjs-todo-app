import { ExceptionMetadataDto } from './dto/exception.resp.dto';

export class CustomError extends Error {
    errorMsg: string;
    statusCode: number;
    metadata?: ExceptionMetadataDto;
    constructor(errorMsg: string, statusCode: number, metadata?: any) {
        super(errorMsg);
        this.name = 'CustomError';
        this.errorMsg = errorMsg;
        this.statusCode = statusCode;
        this.metadata = metadata;
    }
}
