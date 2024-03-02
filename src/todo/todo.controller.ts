import {
    Body,
    Controller,
    Delete,
    Get,
    HttpCode,
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
    private normalUser: UserContxt;

    constructor(private todoService: TodoService) {
        // initial value for demo
        this.defaultUser = {
            userId: '0c3c55f8-0921-45e0-ae03-508b5cd1441b',
            userName: 'Admin',
            userRole: UserRole.ADMIN,
        };
        this.normalUser = {
            userId: '5eee6ead-5249-43a3-9883-df2d92f68efd',
            userName: 'John Smith',
            userRole: UserRole.NORMAL,
        };
    }

    @Post('')
    @HttpCode(201)
    public async create(@Body() req: CreateTodoReqDto) {
        return await this.todoService.create(req, this.defaultUser);
    }

    @Post('search')
    @HttpCode(200)
    public async search(@Body() req: ListTodoReqDto) {
        return await this.todoService.search(req);
    }

    @Get(':id')
    @HttpCode(200)
    public async get(@Param('id') id: string) {
        return await this.todoService.get(id);
    }

    @Patch(':id')
    @HttpCode(200)
    public async update(
        @Param('id') itemId: string,
        @Body() req: UpdateTodoReqDto,
    ) {
        return await this.todoService.update(itemId, req, this.defaultUser);
    }

    @Patch('normal-user/:id')
    @HttpCode(200)
    public async normalUserUpdate(
        @Param('id') itemId: string,
        @Body() req: UpdateTodoReqDto,
    ) {
        return await this.todoService.update(itemId, req, this.normalUser);
    }

    @Delete(':id')
    @HttpCode(200)
    public async delete(@Param('id') id: string) {
        return await this.todoService.delete(id, this.defaultUser);
    }
}
