import { Test, TestingModule } from '@nestjs/testing';
import { TodoItemDbService } from './todo-item-db.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { TodoItem } from 'src/dao/TodoItem';
import {
    DataSourceMock,
    TodoItemRepositoryMock,
    qrMock,
} from './todo-item-db.mock';
import { DataSource, QueryRunner, Repository } from 'typeorm';
import { Logger } from '@nestjs/common';

describe('TodoItemDbService', () => {
    let service: TodoItemDbService;
    let repo: Repository<TodoItem>;
    let dataSource: DataSource;

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
            ],
        }).compile();

        service = module.get<TodoItemDbService>(TodoItemDbService);
        repo = module.get(getRepositoryToken(TodoItem));
        dataSource = module.get(DataSource);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    it('can getById', async () => {
        jest.spyOn(repo, 'findOneOrFail').mockResolvedValueOnce(
            Object.assign(new TodoItem(), { itemId: 'item_id' }),
        );
        const result = await service.getById('item_id');
        expect(repo.findOneOrFail).toHaveBeenCalledTimes(1);
        expect(result.itemId).toEqual('item_id');
    });

    it('can deleteById', async () => {
        jest.spyOn(dataSource, 'createQueryRunner').mockReturnValueOnce(
            qrMock as unknown as QueryRunner,
        );

        const lastUpdatedTime = new Date();
        const item = Object.assign(new TodoItem(), {
            itemId: 'item_id',
            lastUpdatedTime,
        });
        jest.spyOn(qrMock.manager, 'findOneOrFail').mockImplementationOnce(() =>
            Promise.resolve(item),
        );
        await service.deleteById(item, 'User');
        expect(qrMock.manager.findOneOrFail).toHaveBeenCalledTimes(1);
        expect(qrMock.manager.update).toHaveBeenCalledTimes(1);
    });
});
