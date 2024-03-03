import { CustomError } from 'src/core/custom-error';
import { CreateTodoReqDto } from '../dto/create-todo.req.dto';

export class CreateTodoValidator {
    constructor(private req: CreateTodoReqDto) {}

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
        this.validateDueDate();
    }
}
