import { Test, TestingModule } from '@nestjs/testing';
import { TodoService } from './todo.service';
import { Logger } from '@nestjs/common';
import { TodoItemDbModule } from 'src/database/todo-item-db/todo-item-db.module';
import { getRepositoryToken } from '@nestjs/typeorm';
import { TodoItem } from 'src/dao/TodoItem';
import { TodoItemRepositoryFake } from 'src/database/todo-item-db/todo-item-db.mock';

describe('TodoService', () => {
    let service: TodoService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [TodoItemDbModule],
            providers: [TodoService, Logger],
        })
            .overrideProvider(getRepositoryToken(TodoItem))
            .useValue(TodoItemRepositoryFake)
            .compile();

        service = module.get<TodoService>(TodoService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
