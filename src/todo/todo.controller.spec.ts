import { Test, TestingModule } from '@nestjs/testing';
import { TodoController } from './todo.controller';
import { TodoService } from './todo.service';
import { Logger } from '@nestjs/common';
import { getRepositoryToken } from '@nestjs/typeorm';
import { TodoItem } from 'src/dao/TodoItem';
import {
    DataSourceMock,
    TodoItemRepositoryMock,
} from 'src/database/todo-item-db/todo-item-db.mock';
import { DataSource } from 'typeorm';
import { TodoItemDbService } from 'src/database/todo-item-db/todo-item-db.service';

describe('TodoController', () => {
    let controller: TodoController;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [],
            controllers: [TodoController],
            providers: [
                {
                    provide: getRepositoryToken(TodoItem),
                    useValue: TodoItemRepositoryMock,
                },
                {
                    provide: DataSource,
                    useValue: DataSourceMock,
                },
                Logger,
                TodoItemDbService,
                TodoService,
            ],
        }).compile();

        controller = module.get<TodoController>(TodoController);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});
