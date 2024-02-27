import { Logger, Module } from '@nestjs/common';
import { TodoModule } from './todo/todo.module';
import { ConfigModule } from '@nestjs/config';
import { DatabaseRootModule } from './database/root/database.root.module';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
        }),
        DatabaseRootModule,
        TodoModule,
    ],
    controllers: [],
    providers: [Logger],
})
export class AppModule {}
