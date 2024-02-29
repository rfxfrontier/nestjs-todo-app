import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { CustomValidationPipe } from './core/custom-validation-pipe';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    const logger = new Logger('bootstrap');
    const port = process.env.PORT || 3000;
    logger.log(`Starting service at port ${port}`);
    app.useGlobalPipes(new CustomValidationPipe());
    await app.listen(port);
}
bootstrap();
