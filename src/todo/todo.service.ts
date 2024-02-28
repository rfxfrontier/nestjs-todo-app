import { Injectable, Logger } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { CreateTodoReqDto } from './dto/create-todo.req.dto';
import { CreateTodoRespDto } from './dto/create-todo.resp.dto';
import { TodoItemDbService } from 'src/database/todo-item-db/todo-item-db.service';
import { ListTodoReqDto } from './dto/list-todo.req.dto';

@Injectable()
export class TodoService {
    private defaultUser = "USER"
    constructor(
        private logger: Logger,
        private todoItemDbService: TodoItemDbService,
    ) {}

    public async create(req: CreateTodoReqDto) {
        const itemId = randomUUID();
        this.logger.log(`Create with id ${itemId}`);
        return new CreateTodoRespDto(itemId);
    }

    public async search(req: ListTodoReqDto) {
        return await this.todoItemDbService.search(req);
    }

    public async get(id: string) {
        const dbResult = await this.todoItemDbService.getById(id);
        if (dbResult == null) {
            throw new Error("Not Found.")
        }
        return dbResult;
    }

    public async delete(id: string) {
        const itemTobeDeleted = await this.todoItemDbService.getById(id);
        const dbResult = await this.todoItemDbService.deleteById(
            itemTobeDeleted,
            this.defaultUser,
        );
        return dbResult;
    }
}
