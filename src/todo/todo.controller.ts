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
import { SearchTodoReqDto } from './dto/search-todo.req.dto';
import { SearchTodoRespDto } from './dto/search-todo.resp.dto';
import { UserContxt } from 'src/user/dto/user-context.dto';
import { UserRole } from 'src/user/dto/user.enum';
import { UpdateTodoReqDto } from './dto/update-todo.req.dto';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { TodoItemViewDto } from './dto/todo-item-view.dto';
import { ExceptionRespDto } from 'src/core/dto/exception.resp.dto';
import { OperationCompleteRespDto } from './dto/operation-complete.resp.dto';

@ApiTags('todo')
@Controller('todo')
@ApiResponse({
    status: 400,
    description: 'Error response',
    type: ExceptionRespDto,
})
@ApiResponse({
    status: 500,
    description: 'Unhandled Error response',
    type: ExceptionRespDto,
})
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
    @ApiOperation({ summary: 'Create todo list item, using user role ADMIN' })
    @ApiResponse({
        status: 201,
        description: 'The created todo list item',
        type: TodoItemViewDto,
    })
    @HttpCode(201)
    public async create(@Body() req: CreateTodoReqDto) {
        return await this.todoService.create(req, this.defaultUser);
    }

    @Post('search')
    @ApiOperation({
        summary: 'Search todo list item, support paging, filtering and sorting',
    })
    @ApiResponse({
        status: 200,
        description: 'Search result with page index, size and record counts',
        type: SearchTodoRespDto,
    })
    @HttpCode(200)
    public async search(@Body() req: SearchTodoReqDto) {
        return await this.todoService.search(req);
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get todo list item by id' })
    @ApiResponse({
        status: 200,
        description: 'The found todo list item',
        type: TodoItemViewDto,
    })
    @HttpCode(200)
    public async get(@Param('id') id: string) {
        return await this.todoService.get(id);
    }

    @Patch(':id')
    @ApiOperation({
        summary: 'Update todo list item by id, using user role ADMIN',
    })
    @HttpCode(200)
    public async update(
        @Param('id') itemId: string,
        @Body() req: UpdateTodoReqDto,
    ) {
        return await this.todoService.update(itemId, req, this.defaultUser);
    }

    @Patch('normal-user/:id')
    @ApiOperation({
        summary: 'Update todo list item by id, using user role NORMAL',
    })
    @HttpCode(200)
    public async normalUserUpdate(
        @Param('id') itemId: string,
        @Body() req: UpdateTodoReqDto,
    ) {
        return await this.todoService.update(itemId, req, this.normalUser);
    }

    @Delete(':itemId')
    @ApiOperation({
        summary: 'Soft delete todo list item by id, using user role ADMIN',
    })
    @ApiParam({
        name: 'itemId',
        required: true,
        description: 'Id of todo list item',
        example: 'c6ec679a-747b-4576-9db5-c6f33687f48',
        type: 'string',
    })
    @ApiParam({
        name: 'itemId',
        required: true,
        description: 'Id of todo list item',
        example: 'c6ec679a-747b-4576-9db5-c6f33687f48',
        type: 'string',
    })
    @ApiResponse({
        status: 200,
        description: 'Operation complete response',
        type: OperationCompleteRespDto,
    })
    @ApiResponse({
        status: 403,
        description:
            'Operation forbidden response, eg: database record is accessed by others at the same time',
        type: ExceptionRespDto,
    })
    @ApiResponse({
        status: 404,
        description: 'Not found response',
        type: ExceptionRespDto,
    })
    @HttpCode(200)
    public async delete(@Param('itemId') id: string) {
        return await this.todoService.delete(id, this.defaultUser);
    }
}
