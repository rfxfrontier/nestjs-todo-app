import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { TodoService } from './todo.service';
import { CreateTodoReqDto } from './dto/create-todo.req.dto';

@Controller('todo')
export class TodoController {
    constructor(private todoService: TodoService) {}

    @Post('create')
    public async create(@Body() req: CreateTodoReqDto) {
        return await this.todoService.create(req);
    }

    @Get('get/:id')
    public async get(@Param('id') id: string) {
        return await this.todoService.get(id);
    }
}
