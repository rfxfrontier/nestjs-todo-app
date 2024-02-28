import { IsNumber, IsOptional, Min } from 'class-validator';

export class ListTodoReqDto {
    @IsOptional()
    @IsNumber()
    status: number | undefined;

    @IsOptional()
    @IsNumber()
    @Min(1)
    page: number = 1

    @IsOptional()
    @IsNumber()
    @Min(1)
    size: number = 10
}
