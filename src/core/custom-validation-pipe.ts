import { Injectable, ValidationError, ValidationPipe } from '@nestjs/common';

export class CustomValidationPipe extends ValidationPipe {
    createExceptionFactory() {
        return (validationErrors: ValidationError[] = []) => {
            if (this.isDetailedOutputDisabled) {
                return new Error(`Validation Error`);
            }
            const errors = this.flattenValidationErrors(validationErrors);
            return new Error(`Validation Error, details ${errors}`);
        };
    }
}
