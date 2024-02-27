import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    const logger = new Logger('bootstrap');
    const port = process.env.PORT || 3000;
    logger.log(`Starting service at port ${port}`);
    await app.listen(port);
}
bootstrap();
