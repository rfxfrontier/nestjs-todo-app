import { Logger, Module } from '@nestjs/common';
import { TodoModule } from './todo/todo.module';

@Module({
    imports: [TodoModule],
    controllers: [],
    providers: [Logger],
})
export class AppModule {}
