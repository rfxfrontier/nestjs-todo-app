import { IsString, MaxLength } from 'class-validator';

export class CreateTodoRespDto {
    itemId: string;

    constructor(itemId: string) {
        this.itemId = itemId;
    }
}
