import { TodoItem } from 'src/dao/TodoItem';
import { CreateTodoReqDto } from 'src/todo/dto/create-todo.req.dto';
import { ListTodoReqDto } from 'src/todo/dto/list-todo.req.dto';
import { SearchSortBy } from 'src/todo/todo.enum';
import { UserContxt } from 'src/user/dto/user-context.dto';
import { FindManyOptions, FindOptionsOrder, FindOptionsWhere } from 'typeorm';

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
        if (status) {
            where = Object.assign(where, { status });
        }
        if (priority) {
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
}
