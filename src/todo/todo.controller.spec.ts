import { Test, TestingModule } from '@nestjs/testing';
import { TodoController } from './todo.controller';
import { TodoService } from './todo.service';
import { Logger } from '@nestjs/common';

describe('TodoController', () => {
    let controller: TodoController;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [TodoController],
            providers: [TodoService, Logger]
        }).compile();

        controller = module.get<TodoController>(TodoController);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});
