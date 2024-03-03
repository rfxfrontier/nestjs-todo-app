import { TodoItem } from 'src/dao/TodoItem';
import { TodoItemViewDto } from './dto/todo-item-view.dto';
import { PriorityEnum, StatusEnum } from './todo.enum';

export class TodoItemUtil {
    public static convertToViewDto(item: TodoItem) {
        let vmTodoItem = new TodoItemViewDto();

        vmTodoItem.itemId = item.itemId;
        vmTodoItem.name = item.name;
        vmTodoItem.description = item.description;
        vmTodoItem.dueDateStr = item.dueDate ? item.dueDate.toISOString() : '';
        vmTodoItem.status = item.status;
        vmTodoItem.statusStr = StatusEnum[item.status];
        vmTodoItem.priority = item.priority;
        vmTodoItem.priorityStr = PriorityEnum[item.priority];
        vmTodoItem.createdBy = item.createdBy;
        vmTodoItem.creationTimeStr = item.creationTime.toISOString();
        vmTodoItem.lastUpdatedBy = item.lastUpdatedBy;
        vmTodoItem.lastUpdatedTimeStr = item.lastUpdatedTime.toISOString();

        return vmTodoItem;
    }

    public static convertToViewDtoList(itemList: TodoItem[]) {
        return itemList.map((item) => TodoItemUtil.convertToViewDto(item));
    }
}
