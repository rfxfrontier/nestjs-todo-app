import { Injectable, Logger } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { CreateTodoReqDto } from './dto/create-todo.req.dto';
import { CreateTodoRespDto } from './dto/create-todo.resp.dto';
import { TodoItemDbService } from 'src/database/todo-item-db/todo-item-db.service';
import { ListTodoReqDto } from './dto/list-todo.req.dto';
import { TodoItemDbUtil } from 'src/database/todo-item-db/todo-item-db.util';
import { UserContxt } from 'src/user/dto/user-context.dto';
import { TodoItemUtil } from './todo.util';

@Injectable()
export class TodoService {
    constructor(
        private logger: Logger,
        private todoItemDbService: TodoItemDbService,
    ) {}

    public async create(req: CreateTodoReqDto, user: UserContxt) {
        const itemToBeCreated = TodoItemDbUtil.buildTodoItem(
            req,
            randomUUID(),
            user,
        );
        this.logger.log(
            `Create with id ${itemToBeCreated.itemId} by ${itemToBeCreated.createdBy}`,
        );
        const itemCreated =
            await this.todoItemDbService.create(itemToBeCreated);
        return TodoItemUtil.convertToViewDto(itemCreated);
    }

    public async search(req: ListTodoReqDto) {
        const { page, size } = req;
        const options = TodoItemDbUtil.buildSearchOptions(req);
        const [searchResultList, count] =
            await this.todoItemDbService.search(options);
        return {
            page,
            size,
            count,
            data: TodoItemUtil.convertToViewDtoList(searchResultList),
        };
    }

    public async get(id: string) {
        const dbResult = await this.todoItemDbService.getById(id);
        if (dbResult == null) {
            throw new Error('Not Found.');
        }
        return TodoItemUtil.convertToViewDto(dbResult);
    }

    public async delete(id: string, user: UserContxt) {
        const itemTobeDeleted = await this.todoItemDbService.getById(id);
        if (itemTobeDeleted == null) {
            throw new Error('Not Found.');
        }

        await this.todoItemDbService.deleteById(itemTobeDeleted, user.userName);
        return {
            isDeleted: true,
        };
    }
}
