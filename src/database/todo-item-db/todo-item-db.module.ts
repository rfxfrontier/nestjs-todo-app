import { Logger, Module } from '@nestjs/common';
import { TodoItemDbService } from './todo-item-db.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TodoItem } from 'src/dao/TodoItem';

@Module({
    imports: [TypeOrmModule.forFeature([TodoItem])],
    providers: [TodoItemDbService, Logger],
    exports: [TodoItemDbService],
})
export class TodoItemDbModule {}
