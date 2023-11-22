import { Module } from "@nestjs/common";
import { StoryController } from "./story.controller";
import { StoryService } from "./story.service";
import { PrismaModule } from "src/prisma/prisma.module";
import { EndpointModule } from "src/endpoint/endpoint.module";

@Module({
  imports: [PrismaModule, EndpointModule],
  controllers: [StoryController],
  providers: [StoryService],
})
export class StoryModule {}
