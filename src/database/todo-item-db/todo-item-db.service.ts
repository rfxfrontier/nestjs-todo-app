import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TodoItem } from 'src/dao/TodoItem';
import { DataSource, FindManyOptions, Repository } from 'typeorm';
import { TodoItemDbUtil } from './todo-item-db.util';
import { ListTodoReqDto } from 'src/todo/dto/list-todo.req.dto';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';

@Injectable()
export class TodoItemDbService {
    constructor(
        @InjectRepository(TodoItem)
        private todoItemRepository: Repository<TodoItem>,
        private logger: Logger,
        private dataSource: DataSource,
    ) {}

    public async create(item: TodoItem) {
        try {
            return await this.todoItemRepository.save(item);
        } catch (ex) {
            this.logger.error(`Failed in create item, error: ${ex.message}`);
            throw ex;
        }
    }

    public async getById(itemId: string) {
        try {
            return await this.todoItemRepository.findOne({
                where: { itemId: itemId, isDeleted: false },
            });
        } catch (ex) {
            this.logger.error(`Failed in getById, error: ${ex.message}`);
            throw ex;
        }
    }

    public async search(options: FindManyOptions<TodoItem>) {
        try {
            return await this.todoItemRepository.findAndCount(options);
        } catch (ex) {
            this.logger.error(`Failed in search item, error: ${ex.message}`);
            throw ex;
        }
    }

    public async update(
        itemTobeUpdated: TodoItem,
        partialEntity: QueryDeepPartialEntity<TodoItem>,
    ) {
        const qr = this.dataSource.createQueryRunner();
        await qr.startTransaction();
        try {
            const { itemId } = itemTobeUpdated;
            const itemJustBeforeUpdate = await qr.manager.findOneOrFail(
                TodoItem,
                {
                    where: { itemId, isDeleted: false },
                },
            );

            TodoItemDbUtil.checkIsSameLastUpdatedTime(
                itemTobeUpdated,
                itemJustBeforeUpdate,
            );

            await qr.manager.update(TodoItem, { itemId }, partialEntity);

            const result = await qr.manager.findOneOrFail(TodoItem, {
                where: { itemId, isDeleted: false },
            });

            await qr.commitTransaction();

            return result;
        } catch (ex) {
            this.logger.error(`Error in udpate todoItem, error: ${ex.message}`);
            await qr.rollbackTransaction();
            throw ex;
        } finally {
            await qr.release();
        }
    }

    public async deleteById(itemTobeUpdated: TodoItem, updateUser: string) {
        const qr = this.dataSource.createQueryRunner();
        await qr.startTransaction();
        try {
            const { itemId } = itemTobeUpdated;
            const itemJustBeforeUpdate = await qr.manager.findOneOrFail(
                TodoItem,
                {
                    where: { itemId, isDeleted: false },
                },
            );

            TodoItemDbUtil.checkIsSameLastUpdatedTime(
                itemTobeUpdated,
                itemJustBeforeUpdate,
            );

            await qr.manager.update(
                TodoItem,
                { itemId },
                { isDeleted: true, lastUpdatedBy: updateUser },
            );

            await qr.commitTransaction();
        } catch (ex) {
            this.logger.error(`Error in udpate todoItem, error: ${ex.message}`);
            await qr.rollbackTransaction();
            throw ex;
        } finally {
            await qr.release();
        }
    }
}
