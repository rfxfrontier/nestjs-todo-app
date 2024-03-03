import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class ExceptionMetadataDto {
    @ApiPropertyOptional({
        example: '615cf455-9ad6-45f7-8f2b-448dd5e621b8',
        description: 'The id of the todo list item',
    })
    itemId?: string;

    @ApiPropertyOptional({
        example: 'Admin',
        description: 'The id of the todo list item',
    })
    actionBy?: string;
}

export class ExceptionRespDto {
    @ApiProperty({
        example: 'Error message',
        description: 'error message',
    })
    errorMsg: string;

    @ApiProperty({
        example: '2024-03-02T15:45:06.836Z',
        description:
            'error response datetime string in UTC timezone in ISO8601 format',
    })
    timestamp: string;

    @ApiPropertyOptional({ type: ExceptionMetadataDto })
    metadata?: ExceptionMetadataDto;

    constructor(
        errorMsg: string,
        timestamp: string,
        metadata: ExceptionMetadataDto | undefined,
    ) {
        this.errorMsg = errorMsg;
        this.timestamp = timestamp;
        this.metadata = metadata;
    }
}
