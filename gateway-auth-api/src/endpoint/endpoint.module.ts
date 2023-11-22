import { Module } from "@nestjs/common";
import { EndpointController } from "./endpoint.controller";
import { EndpointService } from "./endpoint.service";
import { PrismaModule } from "src/prisma/prisma.module";

@Module({
  imports: [PrismaModule],
  exports: [EndpointService],
  controllers: [EndpointController],
  providers: [EndpointService],
})
export class EndpointModule {}
