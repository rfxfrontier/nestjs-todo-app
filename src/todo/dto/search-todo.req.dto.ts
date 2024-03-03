import { IsEnum, IsNumber, IsOptional, Min } from 'class-validator';
import { PriorityEnum, SearchSortBy, StatusEnum } from '../todo.enum';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class SearchTodoReqDto {
    @IsOptional()
    @IsNumber()
    @IsEnum(StatusEnum)
    @ApiPropertyOptional({
        example: 0,
        enum: StatusEnum,
        description:
            'Status of todo list item, can be 0: NOT_STARTED | 1: IN_PROGRESS | 2: COMPLETED | 9: BLOCKED',
    })
    status: number | undefined;

    @IsOptional()
    @IsNumber()
    @IsEnum(PriorityEnum)
    @ApiPropertyOptional({
        example: 20,
        enum: PriorityEnum,
        description:
            'Priority of todo list item, can be 10: HIGH | 20: MEDIUM | 30: LOW',
    })
    priority: number | undefined;

    @IsOptional()
    @IsNumber()
    @Min(1)
    @ApiPropertyOptional({
        example: 1,
        description: 'Number of page of the search result',
        default: 1,
        minimum: 1,
    })
    page: number = 1;

    @IsOptional()
    @IsNumber()
    @Min(1)
    @ApiPropertyOptional({
        example: 5,
        default: 5,
        minimum: 1,
        description: 'Page size of the search result',
    })
    size: number = 5;

    @IsOptional()
    @IsEnum(SearchSortBy)
    @ApiPropertyOptional({
        example: 'CREATION_TIME_DESC',
        default: 'CREATION_TIME_DESC',
        enum: SearchSortBy,
        description: 'Sorting opton of the search result',
    })
    sortBy: string = SearchSortBy.CREATION_TIME_DESC;
}
