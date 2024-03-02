import { Transform } from 'class-transformer';
import { IsDateString, IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateTodoReqDto {
    @IsString()
    @MaxLength(256)
    @IsNotEmpty()
    name: string;

    @IsString()
    @MaxLength(4096)
    @IsNotEmpty()
    description: string;

    @IsDateString({ strict: true, strictSeparator: true })
    @IsNotEmpty()
    dueDateStr: string;
}
