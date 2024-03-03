import { Logger, Module } from '@nestjs/common';
import { TodoController } from './todo.controller';
import { TodoService } from './todo.service';
import { TodoItemDbModule } from 'src/database/todo-item-db/todo-item-db.module';
@Module({
    imports: [TodoItemDbModule],
    controllers: [TodoController],
    providers: [TodoService, Logger],
})
export class TodoModule {}
