import { Logger, Module } from '@nestjs/common';
import { TodoModule } from './todo/todo.module';
import { ConfigModule } from '@nestjs/config';
import { DatabaseRootModule } from './database/root/database.root.module';
import { APP_FILTER } from '@nestjs/core';
import { GlobalExceptionsFilter } from './core/global.exceptions.filter';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
        }),
        DatabaseRootModule,
        TodoModule,
    ],
    controllers: [],
    providers: [
        Logger,
        {
            provide: APP_FILTER,
            useClass: GlobalExceptionsFilter,
        },
    ],
})
export class AppModule {}
