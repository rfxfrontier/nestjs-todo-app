import { Test, TestingModule } from '@nestjs/testing';
import { TodoController } from './todo.controller';
import { TodoService } from './todo.service';
import { Logger } from '@nestjs/common';
import { TodoItemDbModule } from 'src/database/todo-item-db/todo-item-db.module';
import { getRepositoryToken } from '@nestjs/typeorm';
import { TodoItem } from 'src/dao/TodoItem';
import { TodoItemRepositoryFake } from 'src/database/todo-item-db/todo-item-db.mock';

describe('TodoController', () => {
    let controller: TodoController;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [TodoItemDbModule],
            controllers: [TodoController],
            providers: [TodoService, Logger],
        })
            .overrideProvider(getRepositoryToken(TodoItem))
            .useValue(TodoItemRepositoryFake)
            .compile();

        controller = module.get<TodoController>(TodoController);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});
