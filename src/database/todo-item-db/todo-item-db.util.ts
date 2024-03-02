import { CustomError } from 'src/core/custom-error';
import { TodoItem } from 'src/dao/TodoItem';
import { CreateTodoReqDto } from 'src/todo/dto/create-todo.req.dto';
import { ListTodoReqDto } from 'src/todo/dto/list-todo.req.dto';
import { UpdateTodoReqDto } from 'src/todo/dto/update-todo.req.dto';
import { SearchSortBy } from 'src/todo/todo.enum';
import { UserContxt } from 'src/user/dto/user-context.dto';
import { FindManyOptions, FindOptionsOrder, FindOptionsWhere } from 'typeorm';
import { QueryPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';

export class TodoItemDbUtil {
    public static buildTodoItem(
        req: CreateTodoReqDto,
        itemId: string,
        user: UserContxt,
    ) {
        const item = new TodoItem();
        item.itemId = itemId;
        const { name, description, dueDateStr } = req;
        item.name = name;
        item.description = description;
        item.dueDate = new Date(dueDateStr);
        item.createdBy = user.userName;
        item.lastUpdatedBy = user.userName;
        return item;
    }

    public static buildSearchOptions(
        req: ListTodoReqDto,
    ): FindManyOptions<TodoItem> {
        const { page, size, status, priority, sortBy } = req;

        let where: FindOptionsWhere<TodoItem> = {
            isDeleted: false,
        };
        if (status != undefined) {
            where = Object.assign(where, { status });
        }
        if (priority != undefined) {
            where = Object.assign(where, { priority });
        }

        const skip = size * (page - 1);
        const take = size;
        let order: FindOptionsOrder<TodoItem>;
        switch (sortBy) {
            case SearchSortBy.DUE_DATE:
                order = { dueDate: 'ASC' };
                break;
            case SearchSortBy.DUE_DATE_DESC:
                order = { dueDate: 'DESC' };
                break;
            case SearchSortBy.LAST_UPDATED_TIME:
                order = { lastUpdatedTime: 'ASC' };
                break;
            case SearchSortBy.LAST_UPDATED_TIME_DESC:
                order = { lastUpdatedTime: 'DESC' };
                break;
            case SearchSortBy.CREATION_TIME:
                order = { creationTime: 'ASC' };
                break;
            case SearchSortBy.CREATION_TIME_DESC:
            default:
                order = { creationTime: 'DESC' };
                break;
        }

        return {
            skip,
            take,
            where,
            order,
        };
    }

    public static buildUpdateOptions(
        req: UpdateTodoReqDto,
        userContext: UserContxt,
    ): QueryPartialEntity<TodoItem> {
        let partialEntity: QueryPartialEntity<TodoItem> = {
            lastUpdatedBy: userContext.userName,
        };

        const { name, description, status, priority, dueDateStr } = req;

        if (name != undefined) {
            partialEntity.name = name;
        }
        if (description != undefined) {
            partialEntity.description = description;
        }
        if (status != undefined) {
            partialEntity.status = status;
        }
        if (priority != undefined) {
            partialEntity.priority = priority;
        }
        if (dueDateStr != undefined) {
            partialEntity.dueDate = new Date(dueDateStr);
        }
        return partialEntity;
    }

    public static checkIsSameLastUpdatedTime(
        itemTobeUpdated: TodoItem,
        itemJustBeforeUpdate: TodoItem,
    ) {
        // check same last updated time, for race condition check
        if (
            itemTobeUpdated.lastUpdatedTime.getTime() !=
            itemJustBeforeUpdate.lastUpdatedTime.getTime()
        ) {
            const { itemId, lastUpdatedBy } = itemJustBeforeUpdate;
            throw new CustomError(`Record is updated by others`, 403, {
                id: itemId,
                lastUpdatedBy,
            });
        }
    }
}
