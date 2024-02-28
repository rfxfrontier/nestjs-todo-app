import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TodoItem } from 'src/dao/TodoItem';
import { DataSource, Repository } from 'typeorm';
import { TodoItemDbUtil } from './todo-item-db.util';
import { ListTodoReqDto } from 'src/todo/dto/list-todo.req.dto';

@Injectable()
export class TodoItemDbService {
    constructor(
        @InjectRepository(TodoItem)
        private todoItemRepository: Repository<TodoItem>,
        private logger: Logger,
        private dataSource: DataSource,
    ) {}

    public async getById(itemId: string) {
        return await this.todoItemRepository.findOne({
            where: { itemId: itemId, isDeleted: false },
        });
    }

    public async search(req: ListTodoReqDto) {
        const options = TodoItemDbUtil.buildSearchOptions(req)
        return await this.todoItemRepository.find(options);
    }

    public async deleteById(todoItem: TodoItem, updateUser: string) {
        const qr = this.dataSource.createQueryRunner();
        await qr.startTransaction();
        try {
            const { itemId } = todoItem;
            const itemTobeUpdated = await qr.manager.findOneOrFail(TodoItem, {
                where: { itemId, isDeleted: false },
            });
            // check same last updated time
            if (
                itemTobeUpdated.lastUpdatedTime.getTime() !=
                todoItem.lastUpdatedTime.getTime()
            ) {
                throw new Error('record is updated by others ');
            }

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
