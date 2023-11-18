import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ValidationPipe, VersioningType } from "@nestjs/common";
import helmet from "helmet";
import * as cookieParser from "cookie-parser";
import { join } from "path";
import { NestExpressApplication } from "@nestjs/platform-express";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

  app.setGlobalPrefix("api");

  app.enableVersioning({
    type: VersioningType.URI,
  });

  app.enableCors({
    origin: ["http://localhost"],
    allowedHeaders: ["Access-Control-Allow-Credentials", "Content-Type"],
    credentials: true,
  });
  app.use(helmet());
  app.use(cookieParser());

  app.useStaticAssets(join(__dirname, "..", "public"));
  app.setBaseViewsDir(join(__dirname, "..", "views"));
  app.setViewEngine("hbs");

  const config = new DocumentBuilder()
    .setTitle("Narrative Nexus API")
    .setDescription("API documentation for Narrative Nexus")
    .setVersion("1.0")
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("api", app, document);

  const PORT = process.env.PORT || 3000;
  await app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
}
bootstrap();
