import { Module } from "@nestjs/common";
import { StoryController } from "./story.controller";
import { StoryService } from "./story.service";
import { PrismaModule } from "src/prisma/prisma.module";
import { EndpointModule } from "src/endpoint/endpoint.module";
import { UserModule } from "src/user/user.module";

@Module({
  imports: [PrismaModule, EndpointModule, UserModule],
  controllers: [StoryController],
  providers: [StoryService],
})
export class StoryModule {}
