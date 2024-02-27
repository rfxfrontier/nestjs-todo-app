import { Test, TestingModule } from '@nestjs/testing';
import { TodoItemDbService } from './todo-item-db.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { TodoItem } from 'src/dao/TodoItem';
import { TodoItemDbModule } from './todo-item-db.module';
import { TodoItemRepositoryFake } from './todo-item-db.mock';

describe('TodoItemDbService', () => {
    let service: TodoItemDbService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [TodoItemDbModule],
            providers: [],
        })
            .overrideProvider(getRepositoryToken(TodoItem))
            .useValue(TodoItemRepositoryFake)
            .compile();

        service = module.get<TodoItemDbService>(TodoItemDbService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
