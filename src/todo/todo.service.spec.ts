import { Test, TestingModule } from '@nestjs/testing';
import { TodoService } from './todo.service';
import { Logger } from '@nestjs/common';
import { TodoItemDbModule } from 'src/database/todo-item-db/todo-item-db.module';
import { getRepositoryToken } from '@nestjs/typeorm';
import { TodoItem } from 'src/dao/TodoItem';
import {
    DataSourceMock,
    TodoItemRepositoryMock,
} from 'src/database/todo-item-db/todo-item-db.mock';
import { DataSource } from 'typeorm';
import { TodoItemDbService } from 'src/database/todo-item-db/todo-item-db.service';

describe('TodoService', () => {
    let service: TodoService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [],
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

        service = module.get<TodoService>(TodoService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
