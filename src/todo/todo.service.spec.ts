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
import { UserContxt } from 'src/user/dto/user-context.dto';
import { UserRole } from 'src/user/dto/user.enum';
import { CreateTodoReqDto } from './dto/create-todo.req.dto';

const mockUser: UserContxt = {
    userId: 'userId',
    userName: 'Admin',
    userRole: UserRole.ADMIN,
};

describe('TodoService', () => {
    let service: TodoService;
    let dbService: TodoItemDbService;

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
        dbService = module.get<TodoItemDbService>(TodoItemDbService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    it('can create', async () => {
        const req: CreateTodoReqDto = {
            name: 'dummt name',
            description: 'dummy description',
            dueDateStr: '2024-03-06T16:00:00.000Z',
        };
        const dbResult = new TodoItem();
        dbResult.name = req.name;
        dbResult.description = req.description;
        dbResult.dueDate = new Date(req.dueDateStr);
        dbResult.creationTime = new Date();
        dbResult.lastUpdatedTime = new Date();

        jest.spyOn(dbService, 'create').mockResolvedValueOnce(dbResult);
        const result = await service.create(req, mockUser);
        expect(result.name).toEqual(req.name);
        expect(result.description).toEqual(req.description);
        expect(result.dueDateStr).toEqual(req.dueDateStr);
        expect(result.creationTimeStr).toEqual(
            dbResult.creationTime.toISOString(),
        );
        expect(result.lastUpdatedTimeStr).toEqual(
            dbResult.lastUpdatedTime.toISOString(),
        );
    });
});
