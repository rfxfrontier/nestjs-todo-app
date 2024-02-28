import { TodoItem } from "src/dao/TodoItem";
import { ListTodoReqDto } from "src/todo/dto/list-todo.req.dto";
import { FindManyOptions, FindOptionsWhere } from "typeorm";

export class TodoItemDbUtil {
    public static buildSearchOptions(req: ListTodoReqDto): FindManyOptions<TodoItem> {
        const { page, size, status } = req

        let where: FindOptionsWhere<TodoItem> = {
            isDeleted: false
        }
        if (req.status) {
            where = Object.assign(where, { status })
        }

        const skip = (size * (page - 1))
        const take = size

        return {
            skip,
            take,
            where
        }
    }
}