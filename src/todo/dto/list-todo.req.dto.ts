import { IsEnum, IsNumber, IsOptional, Min } from 'class-validator';
import { PriorityEnum, SearchSortBy, StatusEnum } from '../todo.enum';

export class ListTodoReqDto {
    @IsOptional()
    @IsNumber()
    @IsEnum(StatusEnum)
    status: number | undefined;

    @IsOptional()
    @IsNumber()
    @IsEnum(PriorityEnum)
    priority: number | undefined;

    @IsOptional()
    @IsNumber()
    @Min(1)
    page: number = 1;

    @IsOptional()
    @IsNumber()
    @Min(1)
    size: number = 10;

    @IsOptional()
    @IsEnum(SearchSortBy)
    sortBy: string = SearchSortBy.CREATION_TIME_DESC;
}
