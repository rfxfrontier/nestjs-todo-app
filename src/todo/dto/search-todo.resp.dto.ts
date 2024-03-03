import { ApiProperty } from '@nestjs/swagger';
import { TodoItemViewDto } from './todo-item-view.dto';

export class SearchTodoRespDto {
    @ApiProperty({
        example: 1,
        description: 'Number of page of the search result',
        default: 1,
        minimum: 1,
    })
    page: number;

    @ApiProperty({
        example: 5,
        default: 5,
        minimum: 1,
        description: 'Page size of the search result',
    })
    size: number;

    @ApiProperty({
        example: 10,
        minimum: 0,
        description: 'Count of todo item of the search result',
    })
    count: number;

    @ApiProperty({
        description: 'List of todo item, converted to view model',
        type: [TodoItemViewDto],
    })
    data: TodoItemViewDto[];
}
