import { CustomError } from 'src/core/custom-error';
import { UpdateTodoReqDto } from '../dto/update-todo.req.dto';
import { PriorityEnum, StatusEnum } from '../todo.enum';
import { TodoItem } from 'src/dao/TodoItem';
import { UserRole } from 'src/user/dto/user.enum';

export class NormalUpdateValidator {
    protected userRole = UserRole.NORMAL;

    constructor(
        private todoItem: TodoItem,
        private req: UpdateTodoReqDto,
    ) {}

    protected getStatusTransitionMatrix(): Record<StatusEnum, StatusEnum[]> {
        return {
            [StatusEnum.NOT_STARTED]: [
                StatusEnum.NOT_STARTED,
                StatusEnum.IN_PROGRESS,
            ],
            [StatusEnum.IN_PROGRESS]: [
                StatusEnum.IN_PROGRESS,
                StatusEnum.COMPLETED,
            ],
            [StatusEnum.COMPLETED]: [StatusEnum.COMPLETED],
            [StatusEnum.BLOCKED]: [StatusEnum.IN_PROGRESS, StatusEnum.BLOCKED],
        };
    }

    protected validateStatus() {
        const { status: statusFrom } = this.todoItem;
        const { status: statusTo } = this.req;
        if (!statusTo) {
            return;
        }
        const transitionMatrix = this.getStatusTransitionMatrix();
        if (!transitionMatrix[statusFrom]) {
            throw new CustomError(
                `${this.userRole} user do not allow update status from ${StatusEnum[statusFrom]}`,
                400,
            );
        }
        const transition: StatusEnum[] = transitionMatrix[statusFrom];
        if (!transition.includes(statusTo)) {
            throw new CustomError(
                `${this.userRole} user do not allow update status from ${StatusEnum[statusFrom]} to ${StatusEnum[statusTo]}`,
                400,
            );
        }
    }

    protected validatePriority() {
        const { priority } = this.req;
        if (!priority) {
            return;
        }
        if (priority == PriorityEnum.HIGH) {
            throw new CustomError(
                `${this.userRole} user do not allow update priority to ${PriorityEnum[PriorityEnum.HIGH]}`,
                400,
            );
        }
    }

    protected validateDueDate() {
        const { dueDateStr } = this.req;
        if (!dueDateStr) {
            return;
        }
        const dueDate = new Date(dueDateStr);
        const currentDate = new Date();
        if (currentDate.getTime() >= dueDate.getTime()) {
            throw new CustomError(
                `Current date (${currentDate.toISOString()}) is greater then input due date (${dueDateStr})`,
                400,
            );
        }
    }

    public validate() {
        this.validateStatus();
        this.validatePriority();
        this.validateDueDate();
    }
}
