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

export class UpdateTodoReqDto {
    @IsOptional()
    @IsString()
    @MaxLength(256)
    name: string | undefined;

    @IsOptional()
    @IsString()
    @MaxLength(4096)
    description: string | undefined;

    @IsOptional()
    @IsDateString({ strict: true, strictSeparator: true })
    dueDateStr: string | undefined;

    @IsOptional()
    @IsNumber()
    @IsEnum(StatusEnum)
    status: number | undefined;

    @IsOptional()
    @IsNumber()
    @IsEnum(PriorityEnum)
    priority: number | undefined;
}
