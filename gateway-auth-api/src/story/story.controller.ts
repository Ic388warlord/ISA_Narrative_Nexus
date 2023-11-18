import {Controller, Post, Body} from "@nestjs/common";
import {StoryService} from "./story.service";
import { Public } from "src/auth/auth.metadata";
import { StoryDto } from "./dtos/story.dto";
import { ApiTags } from "@nestjs/swagger";
import { SaveStoryDto } from "./dtos/savestory.dto";

@ApiTags("story")
@Controller({
  path: 'story',
  version: '1',
})

export class StoryController {
  // Dependency injection, give me an instance
  // private only accessible within the class
  constructor(private storyService:StoryService) {}

  @Public()
  @Post('generatestory')
  async generateStory(@Body() storyDto: StoryDto): Promise<any> {
    console.log("Data value: ", storyDto);
    return this.storyService.generateStory(storyDto);
  }

  @Public()
  @Post('savestory')
  async saveStory(@Body() savestoryDto: SaveStoryDto): Promise<any> {
    console.log("Data value: ", savestoryDto);
    return this.storyService.saveStory(savestoryDto);
  }
}