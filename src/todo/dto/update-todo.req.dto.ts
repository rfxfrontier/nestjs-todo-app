import {
    IsDateString,
    IsEnum,
    IsNumber,
    IsOptional,
    IsString,
    MaxLength,
    IsNotEmpty,
} from 'class-validator';
import { PriorityEnum, StatusEnum } from '../todo.enum';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateTodoReqDto {
    @IsOptional()
    @IsString()
    @MaxLength(256)
    @ApiPropertyOptional({
        example: 'Todo item name',
        description: 'Todo item name',
        maxLength: 256,
    })
    name: string | undefined;

    @IsOptional()
    @IsString()
    @MaxLength(4096)
    @ApiPropertyOptional({
        example: 'Todo item description',
        description: 'Todo item description',
        maxLength: 4096,
    })
    description: string | undefined;

    @IsOptional()
    @IsDateString({ strict: true, strictSeparator: true })
    @ApiPropertyOptional({
        example: '2024-03-06T16:00:00.000Z',
        description:
            'Due datetime string in UTC timezone in ISO8601 format, can not be earlier then create time',
    })
    dueDateStr: string | undefined;

    @IsOptional()
    @IsNumber()
    @IsEnum(StatusEnum)
    @ApiPropertyOptional({
        example: 0,
        enum: StatusEnum,
        description: `Status of todo list item, can be 0: NOT_STARTED | 1: IN_PROGRESS | 2: COMPLETED | 9: BLOCKED, additional validation per user role and existing status`,
    })
    status: number | undefined;

    @IsOptional()
    @IsNumber()
    @IsEnum(PriorityEnum)
    @ApiPropertyOptional({
        example: 20,
        enum: PriorityEnum,
        description:
            'Priority of todo list item, can be 10: HIGH | 20: MEDIUM | 30: LOW, only Admin user can set priority to HIGH',
    })
    priority: number | undefined;
}
