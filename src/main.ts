import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { CustomValidationPipe } from './core/custom-validation-pipe';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    const logger = new Logger('bootstrap');
    const port = process.env.PORT || 3000;
    logger.log(`Starting service at port ${port}`);
    app.useGlobalPipes(new CustomValidationPipe());

    const config = new DocumentBuilder()
        .setTitle('Todo List API Application')
        .setDescription('Swagger document for Todo List API Application')
        .setVersion('1.0')
        .addTag('todo')
        .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document);

    await app.listen(port);
}
bootstrap();
