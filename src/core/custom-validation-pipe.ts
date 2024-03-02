import { Injectable, ValidationError, ValidationPipe } from '@nestjs/common';
import { CustomError } from './custom-error';

export class CustomValidationPipe extends ValidationPipe {
    createExceptionFactory() {
        return (validationErrors: ValidationError[] = []) => {
            if (this.isDetailedOutputDisabled) {
                return new CustomError(`Validation Error`, 400);
            }
            const errors = this.flattenValidationErrors(validationErrors);
            return new CustomError(`Validation Error, details ${errors}`, 400);
        };
    }
}
