import { Logger, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TodoItem } from 'src/dao/TodoItem';

@Module({
    imports: [
        TypeOrmModule.forRootAsync({
            useFactory: async () => {
                const logger = new Logger(TypeOrmModule.name);
                const { DB_HOST, DB_PORT, DB_USER, DB_PASSWORD } = process.env;
                const port = parseInt(DB_PORT);
                logger.log(
                    `Connecting database ${JSON.stringify({ DB_HOST, DB_PORT, DB_USER })}`,
                );
                return {
                    type: 'mariadb',
                    synchronize: false,
                    autoLoadEntities: true,
                    logging: true,
                    host: DB_HOST,
                    port: port,
                    username: DB_USER,
                    password: DB_PASSWORD,
                    database: 'todo_app',
                    charset: 'utf8mb4_unicode_ci',
                    retryAttempts: 5,
                };
            },
        }),
        TypeOrmModule.forFeature([TodoItem]),
    ],
    providers: [],
    exports: [],
})
export class DatabaseRootModule {}
