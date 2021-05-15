import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
    // Get app configuration environment variables
    const appPort = process.env.APP_PORT || 3000;

    // Initialize app
    const app = await NestFactory.create(AppModule);

    // Start app server
    await app.listen(appPort);
}
bootstrap();
