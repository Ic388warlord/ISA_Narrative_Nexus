"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const common_1 = require("@nestjs/common");
const helmet_1 = require("helmet");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.useGlobalPipes(new common_1.ValidationPipe({ whitelist: true }));
    app.setGlobalPrefix("api");
    app.enableVersioning({
        type: common_1.VersioningType.URI,
    });
    app.enableCors();
    app.use((0, helmet_1.default)());
    const PORT = process.env.PORT || 3000;
    await app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
}
bootstrap();
//# sourceMappingURL=main.js.map