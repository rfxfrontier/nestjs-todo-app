import { Injectable, Logger } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { CreateTodoReqDto } from './dto/create-todo.req.dto';
import { CreateTodoRespDto } from './dto/create-todo.resp.dto';

@Injectable()
export class TodoService {
    constructor(private logger: Logger) {}

    public async create(req: CreateTodoReqDto) {
        const itemId = randomUUID();
        this.logger.log(`Create with id ${itemId}`);
        return new CreateTodoRespDto(itemId);
    }

    public async get(id: string) {
        throw new Error('Method not implemented.');
    }
}
