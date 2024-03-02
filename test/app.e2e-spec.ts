import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { CustomValidationPipe } from 'src/core/custom-validation-pipe';

describe('TodoController (e2e)', () => {
    let app: INestApplication;
    let itemId = null;

    beforeAll(() => {
        jest.useFakeTimers();
        jest.setSystemTime(new Date(2024, 1, 1));
    });

    beforeEach(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        app = moduleFixture.createNestApplication();
        app.useGlobalPipes(new CustomValidationPipe());
        await app.init();
    });

    it('/todo (POST)', async () => {
        const payload = {
            name: 'test name',
            description: 'test description',
            dueDateStr: '2024-03-06T16:00:00.000Z',
        };
        const test = request(app.getHttpServer())
            .post('/todo')
            .send(payload)
            .expect(201);
        itemId = (await test).body.itemId;
        console.log(`itemId ${itemId} for following tests`);
        return test;
    });

    it('/todo/search (POST)', async () => {
        const payload = {
            page: 1,
            size: 5,
            sortBy: 'CREATION_TIME_DESC',
        };
        return request(app.getHttpServer())
            .post('/todo/search')
            .send(payload)
            .expect(200);
    });

    it('/todo/:id (GET)', async () => {
        return request(app.getHttpServer()).get(`/todo/${itemId}`).expect(200);
    });

    it('/todo/:id (PATCH)', async () => {
        const payload = {
            name: 'test name - updated',
            description: 'test description - updated',
            status: 1,
        };
        return request(app.getHttpServer())
            .patch(`/todo/${itemId}`)
            .send(payload)
            .expect(200);
    });

    it('/todo/:id (DELETE)', async () => {
        return request(app.getHttpServer())
            .delete(`/todo/${itemId}`)
            .expect(200);
    });
});
