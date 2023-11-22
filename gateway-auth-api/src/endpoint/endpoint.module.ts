import { forwardRef, Module } from "@nestjs/common";
import { EndpointController } from "./endpoint.controller";
import { EndpointService } from "./endpoint.service";
import { PrismaModule } from "src/prisma/prisma.module";
import { UserModule } from "src/user/user.module";

@Module({
  imports: [PrismaModule, forwardRef(() => UserModule)],
  exports: [EndpointService],
  controllers: [EndpointController],
  providers: [EndpointService],
})
export class EndpointModule {}
