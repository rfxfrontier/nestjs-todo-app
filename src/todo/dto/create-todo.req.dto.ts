import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsDateString, IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateTodoReqDto {
    @IsString()
    @MaxLength(256)
    @IsNotEmpty()
    @ApiProperty({
        example: 'Todo item name',
        description: 'Todo item name',
        maxLength: 256,
    })
    name: string;

    @IsString()
    @MaxLength(4096)
    @IsNotEmpty()
    @ApiProperty({
        example: 'Todo item description',
        description: 'Todo item description',
        maxLength: 4096,
    })
    description: string;

    @IsDateString({ strict: true, strictSeparator: true })
    @IsNotEmpty()
    @ApiProperty({
        example: '2024-03-06T16:00:00.000Z',
        description:
            'Due datetime string in UTC timezone in ISO8601 format, can not be earlier then create time',
    })
    dueDateStr: string;
}
