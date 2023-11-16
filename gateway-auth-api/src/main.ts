import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ValidationPipe, VersioningType } from "@nestjs/common";
import helmet from "helmet";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

  app.setGlobalPrefix("api");

  app.enableVersioning({
    type: VersioningType.URI,
  });

  app.enableCors();
  app.use(helmet());

  const PORT = process.env.PORT || 3000;
  await app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
}
bootstrap();
