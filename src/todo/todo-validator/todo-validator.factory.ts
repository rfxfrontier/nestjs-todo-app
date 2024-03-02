import { TodoItem } from 'src/dao/TodoItem';
import { UserContxt } from 'src/user/dto/user-context.dto';
import { UserRole } from 'src/user/dto/user.enum';
import { UpdateTodoReqDto } from '../dto/update-todo.req.dto';
import { AdminUpdateValidator } from './admin-update-validator';
import { NormalUpdateValidator } from './normal-update-validator';

export class TodoValidatorFactory {
    public static getUpdateReqValidator(
        userContext: UserContxt,
        todoItem: TodoItem,
        req: UpdateTodoReqDto,
    ) {
        switch (userContext.userRole) {
            case UserRole.ADMIN:
                return new AdminUpdateValidator(todoItem, req);
            case UserRole.NORMAL:
            default:
                return new NormalUpdateValidator(todoItem, req);
        }
    }
}
