import { ArgumentsHost, Catch, Logger } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { Response } from 'express';
import { CustomError } from './custom-error';

@Catch()
export class GlobalExceptionsFilter extends BaseExceptionFilter {
    constructor(private logger: Logger) {
        super();
    }

    public catch(exception: any, host: ArgumentsHost): void {
        const ctx = host.switchToHttp();
        const res = ctx.getResponse<Response>();

        let errorMsg: string = '';
        let statusCode: number = 500;
        let metadata: any = {};

        if (exception instanceof Error) {
            let traces: string[] = exception.stack?.split('\n') || [];

            let exceptionRaised = {
                error: traces.length > 0 ? traces[0] : '',
                function: traces.length > 1 ? traces[1] : '',
                stacktrace: exception.stack,
            };
            this.logger.error(
                `exceptionRaised, ${JSON.stringify(exceptionRaised)}`,
            );

            if (exception instanceof CustomError) {
                errorMsg = exception.errorMsg;
                statusCode = exception.statusCode;
                metadata = exception.metadata;
            } else {
                errorMsg = `Unknown Exception, ${exception.message}`;
            }
        }

        res.status(statusCode).json({
            error: {
                errorMsg,
                statusCode,
                metadata,
                timestamp: new Date().toISOString(),
            },
        });
    }
}
