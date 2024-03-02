import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
} from '@nestjs/common';
import { TodoService } from './todo.service';
import { CreateTodoReqDto } from './dto/create-todo.req.dto';
import { ListTodoReqDto } from './dto/list-todo.req.dto';
import { UserContxt } from 'src/user/dto/user-context.dto';
import { UserRole } from 'src/user/dto/user.enum';
import { UpdateTodoReqDto } from './dto/update-todo.req.dto';

@Controller('todo')
export class TodoController {
    private defaultUser: UserContxt;

    constructor(private todoService: TodoService) {
        // initial value for demo
        this.defaultUser = {
            userId: '0c3c55f8-0921-45e0-ae03-508b5cd1441b',
            userName: 'Admin',
            userRole: UserRole.ADMIN,
        };
    }

    @Post('')
    public async create(@Body() req: CreateTodoReqDto) {
        return await this.todoService.create(req, this.defaultUser);
    }

    @Post('search')
    public async search(@Body() req: ListTodoReqDto) {
        return await this.todoService.search(req);
    }

    @Get(':id')
    public async get(@Param('id') id: string) {
        return await this.todoService.get(id);
    }

    @Patch(':id')
    public async update(
        @Param('id') itemId: string,
        @Body() req: UpdateTodoReqDto,
    ) {
        return await this.todoService.update(itemId, req, this.defaultUser);
    }

    @Delete(':id')
    public async delete(@Param('id') id: string) {
        return await this.todoService.delete(id, this.defaultUser);
    }
}
