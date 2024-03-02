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
import { SearchSortBy, StatusEnum } from './todo.enum';
import { ListTodoReqDto } from './dto/list-todo.req.dto';
import { UpdateTodoReqDto } from './dto/update-todo.req.dto';

const mockUser: UserContxt = {
    userId: 'userId',
    userName: 'Admin',
    userRole: UserRole.ADMIN,
};

describe('TodoService', () => {
    let service: TodoService;
    let dbService: TodoItemDbService;

    beforeAll(() => {
        jest.useFakeTimers();
        jest.setSystemTime(new Date(2024, 1, 1));
    });

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
            name: 'dummy name',
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

    it('can get', async () => {
        const dbResult = new TodoItem();
        dbResult.name = 'dummy name';
        dbResult.description = 'dummy description';
        dbResult.dueDate = new Date('2024-03-06T16:00:00.000Z');
        dbResult.creationTime = new Date();
        dbResult.lastUpdatedTime = new Date();

        jest.spyOn(dbService, 'getById').mockResolvedValueOnce(dbResult);

        const result = await service.get('');

        expect(result.name).toEqual(dbResult.name);
        expect(result.description).toEqual(dbResult.description);
        expect(result.dueDateStr).toEqual(dbResult.dueDate.toISOString());
        expect(result.creationTimeStr).toEqual(
            dbResult.creationTime.toISOString(),
        );
        expect(result.lastUpdatedTimeStr).toEqual(
            dbResult.lastUpdatedTime.toISOString(),
        );
    });

    it('can search', async () => {
        const req: ListTodoReqDto = {
            page: 1,
            size: 5,
            status: 0,
            priority: 20,
            sortBy: SearchSortBy.CREATION_TIME_DESC,
        };

        jest.spyOn(dbService, 'search').mockResolvedValueOnce([[], 0]);
        const result = await service.search(req);
        expect(result.data.length).toEqual(0);
    });

    it('can update', async () => {
        const dbResult = new TodoItem();
        dbResult.name = 'dummy name';
        dbResult.description = 'dummy description';
        dbResult.dueDate = new Date('2024-03-06T16:00:00.000Z');
        dbResult.status = StatusEnum.NOT_STARTED;
        dbResult.creationTime = new Date();
        dbResult.lastUpdatedTime = new Date();

        jest.spyOn(dbService, 'getById').mockResolvedValueOnce(dbResult);
        jest.spyOn(dbService, 'update').mockResolvedValueOnce(dbResult);

        const req = new UpdateTodoReqDto();
        req.name = dbResult.name;
        req.status = dbResult.status;
        req.dueDateStr = dbResult.dueDate.toISOString();

        const result = await service.update('itemId', req, mockUser);

        expect(result.name).toEqual(dbResult.name);
        expect(result.description).toEqual(dbResult.description);
        expect(result.dueDateStr).toEqual(dbResult.dueDate.toISOString());
        expect(result.creationTimeStr).toEqual(
            dbResult.creationTime.toISOString(),
        );
        expect(result.lastUpdatedTimeStr).toEqual(
            dbResult.lastUpdatedTime.toISOString(),
        );
    });

    it('can not update when could not pass validation', async () => {
        const dbResult = new TodoItem();
        dbResult.name = 'dummy name';
        dbResult.description = 'dummy description';
        dbResult.dueDate = new Date('2023-12-31T16:00:00.000Z');
        dbResult.status = StatusEnum.NOT_STARTED;
        dbResult.creationTime = new Date();
        dbResult.lastUpdatedTime = new Date();

        jest.spyOn(dbService, 'getById').mockResolvedValueOnce(dbResult);
        jest.spyOn(dbService, 'update').mockResolvedValueOnce(dbResult);

        const req = new UpdateTodoReqDto();
        req.status = dbResult.status;

        try {
            await service.update('itemId', req, mockUser);
        } catch (ex) {
            expect(ex).toThrow();
        }
    });
});
