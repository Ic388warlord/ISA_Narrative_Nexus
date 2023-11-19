import {Controller, Post, Body, Get, Param} from "@nestjs/common";
import {StoryService} from "./story.service";
import { StoryDto } from "./dtos/story.dto";
import { ApiTags } from "@nestjs/swagger";
import { SaveStoryDto } from "./dtos/savestory.dto";
import { StringService } from "src/util/util.service";

@ApiTags("story")
@Controller({
  path: 'story',
  version: '1',
})

export class StoryController {
  // Dependency injection, give me an instance
  // private only accessible within the class
  constructor(
    private storyService:StoryService,
    private readonly stringService: StringService
  ) {}

  @Post('generatestory')
  async generateStory(@Body() storyDto: StoryDto): Promise<any> {
    console.log(this.stringService.story.LOG_DATA, storyDto);
    return this.storyService.generateStory(storyDto);
  }

  @Post('savestory')
  async saveStory(@Body() savestoryDto: SaveStoryDto): Promise<any> {
    console.log(this.stringService.story.LOG_DATA, savestoryDto);
    return this.storyService.saveStory(savestoryDto);
  }

  @Get('getUserStories/:username')
  async getUserStories(@Param("username") username: string) {
    return this.storyService.getUserStories(username);
  }
}