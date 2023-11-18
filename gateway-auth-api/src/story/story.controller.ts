import {Controller, Post, Body} from "@nestjs/common";
import {StoryService} from "./story.service";
import { Public } from "src/auth/auth.metadata";
import { StoryDto } from "./dtos/story.dto";

@Controller('story')
export class StoryController {
  // Dependency injection, give me an instance
  // private only accessible within the class
  constructor(private storyService:StoryService) {}

  @Public()
  @Post('generate')
  async generateStory(@Body() storyDto: StoryDto): Promise<any> {
    console.log("Data value: ", storyDto);
    return this.storyService.generateStory(storyDto);
  }
}