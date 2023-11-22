import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  Delete,
  Req,
} from "@nestjs/common";
import { StoryService } from "./story.service";
import { StoryDto } from "./dtos/story.dto";
import { ApiTags } from "@nestjs/swagger";
import { Request } from "express";
import { SaveStoryDto } from "./dtos/savestory.dto";
import { StringService } from "src/util/util.service";
import { EditStoryDto } from "./dtos/editstory.dto";
import { DeleteStoryDto } from "./dtos/deleteStory.dto";
import { EndpointService } from "src/endpoint/endpoint.service";
import { HttpMethod } from "@prisma/client";
import { UserService } from "src/user/user.service";

@ApiTags("story")
@Controller({
  path: "story",
  version: "1",
})
export class StoryController {
  // Dependency injection, give me an instance
  // private only accessible within the class
  constructor(
    private readonly storyService: StoryService,
    private readonly stringService: StringService,
    private readonly endpointService: EndpointService,
    private readonly userService: UserService,
  ) {}

  @Post("generatestory")
  async generateStory(
    @Req() req: Request,
    @Body() storyDto: StoryDto,
  ): Promise<any> {
    console.log(this.stringService.story.LOG_DATA, storyDto);

    this.endpointService.updateEndpointCounter({
      method: HttpMethod[req.method],
      name: req.path,
    });

    this.userService.updateRequestCounter({
      username: req["user"].username,
    });

    return this.storyService.generateStory(storyDto);
  }

  @Post("savestory")
  async saveStory(
    @Req() req: Request,
    @Body() savestoryDto: SaveStoryDto,
  ): Promise<any> {
    console.log(this.stringService.story.LOG_DATA, savestoryDto);

    this.endpointService.updateEndpointCounter({
      method: HttpMethod[req.method],
      name: req.path,
    });

    this.userService.updateRequestCounter({
      username: req["user"].username,
    });

    return this.storyService.saveStory(savestoryDto);
  }

  @Get("getUserStories/:username")
  async getUserStories(
    @Req() req: Request,
    @Param("username") username: string,
  ) {
    this.endpointService.updateEndpointCounter({
      method: HttpMethod[req.method],
      name: this.stringService.endpoint.GET_USER_STORIES_PATH,
    });

    this.userService.updateRequestCounter({
      username: req["user"].username,
    });

    return this.storyService.getUserStories(username);
  }

  @Get("getUserStory/:storyid")
  async getUserStory(@Req() req: Request, @Param("storyid") storyid: number) {
    this.endpointService.updateEndpointCounter({
      method: HttpMethod[req.method],
      name: this.stringService.endpoint.GET_USER_STORY_PATH,
    });

    this.userService.updateRequestCounter({
      username: req["user"].username,
    });

    return this.storyService.getUserStory(+storyid);
  }

  @Patch("editstory")
  async editStory(
    @Req() req: Request,
    @Body() editStoryDto: EditStoryDto,
  ): Promise<any> {
    console.log(this.stringService.story.LOG_DATA, editStoryDto);

    this.endpointService.updateEndpointCounter({
      method: HttpMethod[req.method],
      name: req.path,
    });

    this.userService.updateRequestCounter({
      username: req["user"].username,
    });

    return this.storyService.editStory(editStoryDto);
  }

  @Delete("deletestory")
  async deleteStory(
    @Req() req: Request,
    @Body() deleteStoryDto: DeleteStoryDto,
  ): Promise<any> {
    this.endpointService.updateEndpointCounter({
      method: HttpMethod[req.method],
      name: req.path,
    });

    this.userService.updateRequestCounter({
      username: req["user"].username,
    });

    console.log(this.stringService.story.LOG_DATA, deleteStoryDto);
    return this.storyService.deleteStory(deleteStoryDto);
  }
}
