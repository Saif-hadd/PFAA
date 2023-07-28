import { ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { NestExpressApplication } from '@nestjs/platform-express';
import { SwaggerModule } from "@nestjs/swagger";
import {resolve } from 'path';
// @ts-ignore
// eslint-disable-next-line
import { AppModule } from "./app.module";
import {
  swaggerPath,
  swaggerDocumentOptions,
  swaggerSetupOptions,
  // @ts-ignore
  // eslint-disable-next-line
} from "./swagger";

const { PORT = 3005 } = process.env;

async function main() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, { cors: true });

  app.setGlobalPrefix("api");
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    })
  );

  app.useStaticAssets(resolve('src/public'));
  app.setBaseViewsDir(resolve('src/views'));
  app.setViewEngine('hbs');
  const document = SwaggerModule.createDocument(app, swaggerDocumentOptions);

  SwaggerModule.setup(swaggerPath, app, document, swaggerSetupOptions);

  void app.listen(PORT);

  return app;
}

module.exports = main();
