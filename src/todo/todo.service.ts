import { Injectable, Logger } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { CreateTodoReqDto } from './dto/create-todo.req.dto';
import { CreateTodoRespDto } from './dto/create-todo.resp.dto';
import { TodoItemDbService } from 'src/database/todo-item-db/todo-item-db.service';

@Injectable()
export class TodoService {
    constructor(
        private logger: Logger,
        private todoItemDbService: TodoItemDbService,
    ) {}

    public async create(req: CreateTodoReqDto) {
        const itemId = randomUUID();
        this.logger.log(`Create with id ${itemId}`);
        return new CreateTodoRespDto(itemId);
    }

    public async get(id: string) {
        const dbResult = await this.todoItemDbService.getById(id);
        return dbResult;
    }

    public async delete(id: string) {
        const itemTobeDeleted = await this.todoItemDbService.getById(id);
        const dbResult = await this.todoItemDbService.deleteById(
            itemTobeDeleted,
            'USER',
        );
        return dbResult;
    }
}
