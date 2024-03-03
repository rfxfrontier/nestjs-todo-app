import { Injectable, Logger } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { CreateTodoReqDto } from './dto/create-todo.req.dto';
import { TodoItemDbService } from 'src/database/todo-item-db/todo-item-db.service';
import { SearchTodoReqDto } from './dto/search-todo.req.dto';
import { SearchTodoRespDto } from './dto/search-todo.resp.dto';
import { TodoItemDbUtil } from 'src/database/todo-item-db/todo-item-db.util';
import { UserContxt } from 'src/user/dto/user-context.dto';
import { TodoItemUtil } from './todo.util';
import { CustomError } from 'src/core/custom-error';
import { UpdateTodoReqDto } from './dto/update-todo.req.dto';
import { TodoValidatorFactory } from './todo-validator/todo-validator.factory';
import { CreateTodoValidator } from './todo-validator/create-validator';

@Injectable()
export class TodoService {
    constructor(
        private logger: Logger,
        private todoItemDbService: TodoItemDbService,
    ) {}

    private async getTodoItemByIdOrFail(itemId: string) {
        const dbResult = await this.todoItemDbService.getById(itemId);
        if (dbResult == null) {
            throw new CustomError(`Todo item not found`, 404, { itemId });
        }
        return dbResult;
    }

    public async create(req: CreateTodoReqDto, user: UserContxt) {
        const itemToBeCreated = TodoItemDbUtil.buildTodoItem(
            req,
            randomUUID(),
            user,
        );
        this.logger.log(
            `Create with id ${itemToBeCreated.itemId} by ${itemToBeCreated.createdBy}`,
        );
        const validator = new CreateTodoValidator(req);
        validator.validate();

        const itemCreated =
            await this.todoItemDbService.create(itemToBeCreated);
        return TodoItemUtil.convertToViewDto(itemCreated);
    }

    public async search(req: SearchTodoReqDto): Promise<SearchTodoRespDto> {
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

    public async get(itemId: string) {
        const dbResult = await this.getTodoItemByIdOrFail(itemId);
        return TodoItemUtil.convertToViewDto(dbResult);
    }

    public async update(
        itemId: string,
        req: UpdateTodoReqDto,
        userContext: UserContxt,
    ) {
        const itemTobeUpdated = await this.getTodoItemByIdOrFail(itemId);
        const validator = TodoValidatorFactory.getUpdateReqValidator(
            userContext,
            itemTobeUpdated,
            req,
        );
        validator.validate();

        const partialEntity = TodoItemDbUtil.buildUpdateOptions(
            req,
            userContext,
        );
        const updatedResult = await this.todoItemDbService.update(
            itemTobeUpdated,
            partialEntity,
        );

        return TodoItemUtil.convertToViewDto(updatedResult);
    }

    public async delete(itemId: string, user: UserContxt) {
        const itemTobeDeleted = await this.getTodoItemByIdOrFail(itemId);
        await this.todoItemDbService.deleteById(itemTobeDeleted, user.userName);
        return {
            isDeleted: true,
        };
    }
}
