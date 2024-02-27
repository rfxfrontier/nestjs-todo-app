import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TodoItem } from 'src/dao/TodoItem';
import { Repository } from 'typeorm';

@Injectable()
export class TodoItemDbService {
    constructor(
        @InjectRepository(TodoItem)
        private todoItemRepository: Repository<TodoItem>,
    ) {}
    public async getById(itemId: string) {
        return await this.todoItemRepository.findOneOrFail({
            where: { itemId: itemId, isDeleted: false },
        });
    }
}
