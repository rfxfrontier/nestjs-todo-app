import { IsString, MaxLength } from 'class-validator';

export class CreateTodoReqDto {
    @IsString()
    @MaxLength(256)
    name: String;

    @IsString()
    @MaxLength(4096)
    description: String;
}
