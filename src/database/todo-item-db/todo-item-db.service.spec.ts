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

    it('can create', async () => {
        const item = Object.assign(new TodoItem(), { itemId: 'item_id' });
        jest.spyOn(repo, 'save').mockResolvedValueOnce(item);
        const result = await service.create(item);
        expect(repo.save).toHaveBeenCalledTimes(1);
        expect(result.itemId).toEqual('item_id');
    });

    it('can getById', async () => {
        jest.spyOn(repo, 'findOne').mockResolvedValueOnce(
            Object.assign(new TodoItem(), { itemId: 'item_id' }),
        );
        const result = await service.getById('item_id');
        expect(repo.findOne).toHaveBeenCalledTimes(1);
        expect(result.itemId).toEqual('item_id');
    });

    it('can search', async () => {
        jest.spyOn(repo, 'findAndCount').mockResolvedValueOnce([[], 0]);
        const result = await service.search({ where: { isDeleted: false } });
        expect(repo.findAndCount).toHaveBeenCalledTimes(1);
        expect(result.length).toEqual(2);
        expect(result[0].length).toEqual(0);
        expect(result[1]).toEqual(0);
    });

    it('can update', async () => {
        jest.spyOn(dataSource, 'createQueryRunner').mockReturnValueOnce(
            qrMock as unknown as QueryRunner,
        );

        const lastUpdatedTime = new Date();
        const item = Object.assign(new TodoItem(), {
            itemId: 'item_id',
            lastUpdatedTime,
        });
        jest.spyOn(qrMock.manager, 'findOneOrFail')
            .mockImplementationOnce(() => Promise.resolve(item))
            .mockImplementationOnce(() => Promise.resolve(item));

        await service.update(item, { name: 'Updated' });
        expect(qrMock.manager.findOneOrFail).toHaveBeenCalledTimes(2);
        expect(qrMock.manager.update).toHaveBeenCalledTimes(1);
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
