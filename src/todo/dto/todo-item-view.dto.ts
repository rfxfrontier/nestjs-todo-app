import { ApiProperty } from '@nestjs/swagger';
import { PriorityEnum, StatusEnum } from '../todo.enum';

export class TodoItemViewDto {
    @ApiProperty({
        example: '615cf455-9ad6-45f7-8f2b-448dd5e621b8',
        description: 'The id of the todo list item',
    })
    itemId: string;

    @ApiProperty({
        example: 'Todo item name',
        description: 'The name of the todo list item',
    })
    name: string;

    @ApiProperty({
        example: 'Todo item description',
        description: 'The description of the todo list item',
    })
    description: string;

    @ApiProperty({
        example: '2024-03-06T16:00:00.000Z',
        description: 'Due datetime string in UTC timezone in ISO8601 format',
    })
    dueDateStr: string;

    @ApiProperty({
        enum: StatusEnum,
        example: 0,
        description: 'The status of the todo list item',
    })
    status: number;

    @ApiProperty({
        example: 'NOT_STARTED',
        description:
            'The status description of the todo list item, can be 0: NOT_STARTED | 1: IN_PROGRESS | 2: COMPLETED | 9: BLOCKED',
    })
    statusStr: string;

    @ApiProperty({
        enum: PriorityEnum,
        example: 20,
        description: 'The priority of the todo list item',
    })
    priority: number;

    @ApiProperty({
        example: 'MEDIUM',
        description:
            'The status description of the todo list item, can be 10: HIGH | 20: MEDIUM | 30: LOW',
    })
    priorityStr: string;

    @ApiProperty({
        example: 'John Smith',
        description: 'Created by username',
    })
    createdBy: string;

    @ApiProperty({
        example: '2024-03-06T16:00:00.000Z',
        description:
            'Creation datetime string in UTC timezone in ISO8601 format',
    })
    creationTimeStr: string;

    @ApiProperty({
        example: 'John Smith',
        description: 'Last updated by username',
    })
    lastUpdatedBy: string;

    @ApiProperty({
        example: '2024-03-06T16:00:00.000Z',
        description:
            'Last updated datetime string in UTC timezone in ISO8601 format',
    })
    lastUpdatedTimeStr: string;
}
