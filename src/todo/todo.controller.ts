import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { TodoService } from './todo.service';
import { CreateTodoReqDto } from './dto/create-todo.req.dto';
import { ListTodoReqDto } from './dto/list-todo.req.dto';

@Controller('todo')
export class TodoController {
    constructor(private todoService: TodoService) {}

    @Post('')
    public async create(@Body() req: CreateTodoReqDto) {
        return await this.todoService.create(req);
    }

    @Post('search')
    public async search(@Body() req: ListTodoReqDto) {
        return await this.todoService.search(req);
    }

    @Get(':id')
    public async get(@Param('id') id: string) {
        return await this.todoService.get(id);
    }

    @Delete(':id')
    public async delete(@Param('id') id: string) {
        return await this.todoService.delete(id);
    }
}
