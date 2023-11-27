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
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { Request } from "express";
import { SaveStoryDto } from "./dtos/savestory.dto";
import { StringService } from "src/util/util.service";
import { EditStoryDto } from "./dtos/editstory.dto";
import { DeleteStoryDto } from "./dtos/deleteStory.dto";
import { EndpointService } from "src/endpoint/endpoint.service";
import { HttpMethod } from "@prisma/client";
import { UserService } from "src/user/user.service";
import { StoryResponseDto } from "./dtos/storyResponse.dto";
import { storyBadGatewayResponseDto } from "./dtos/storyBadGatewayResponse.dto";
import { SaveStoryResponseDto } from "./dtos/savestoryResponse.dto";
import { SaveStoryUserNotFoundResponseDto } from "./dtos/savestoryUserNotFoundResponse.dto";
import { GetUserStoriesResponseDto } from "./dtos/getUserStoriesResponse.dto";
import { GetUserStoriesUserNotFoundResponseDto } from "./dtos/getUserStoriesUserNotFoundResponse.dto";
import { GetUserStoryResponseDto } from "./dtos/getUserStoryResponse.dto";
import { GetUserStoryInvalidStoryIDResponseDto } from "./dtos/getUserStoryInvalidStoryIDResponse.dto";
import { GetUserStoryNotFoundResponseDto } from "./dtos/getUserStoryNotFoundResponse.dto";
import { SaveStoryServiceUnavailableResponseDto } from "./dtos/savestoryServiceUnavailableResponse.dto";
import { GetUserStoriesServiceUnavailableResponse } from "./dtos/getUserStoriesServiceUnavailableResponse.dto";
import { GetUserStoryServiceUnavailableResponseDto } from "./dtos/getUserStoryServiceUnavailableResponse.dto";
import { EditStoryResponseDto } from "./dtos/editstoryResponse.dto";
import { EditStoryNotFoundResponseDto } from "./dtos/editstoryNotFoundResponse.dto";
import { EditStoryServiceUnavailableResponseDto } from "./dtos/editstoryServiceUnavailableResponse.dto";
import { DeleteStoryResponseDto } from "./dtos/deleteStoryResponse.dto";
import { DeleteStoryNotFoundResponseDto } from "./dtos/deleteStoryNotFoundResponse.dto";
import { DeleteStoryServiceUnavailableResponseDto } from "./dtos/deletestoryServiceUnavailableResponse.dto";

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

  @ApiOperation({
    summary:
      "Given a partial input text, finish off sentence and generate new sentence based on genre and input text.",
    description: `A request will be made from the authentication server to machine learning with the inputted text.
      The machine learning server will then use hugging face model to generate new text for the story based on input
      text and genre which then return all the data back to the authentication server.`,
  })
  @ApiResponse({
    status: 200,
    description: `Successful request and response to the ML server, send data back to Authentication server then to client server`,
    type: StoryResponseDto,
  })
  @ApiResponse({
    status: 502,
    description: "Received an invalid response from ML server",
    type: storyBadGatewayResponseDto,
  })
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

  @ApiOperation({
    summary:
      "When user is satisfied with their generate story, they can save the story.",
    description: `When user saves story, it will create a new entry in the prisma story table.`,
  })
  @ApiResponse({
    status: 201,
    description: `Story is saved and entry is created in story table`,
    type: SaveStoryResponseDto,
  })
  @ApiResponse({
    status: 404,
    description: "User does not exist.",
    type: SaveStoryUserNotFoundResponseDto,
  })
  @ApiResponse({
    status: 503,
    description: "Unable to connect to the database.",
    type: SaveStoryServiceUnavailableResponseDto,
  })
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

  @ApiOperation({
    summary: "Retrieve a list of all the stories from a user",
    description: `From the story table grab all stories that belongs to the user`,
  })
  @ApiResponse({
    status: 200,
    description: `Successfully returns all info of stories that is associated with the user.`,
    type: GetUserStoriesResponseDto,
  })
  @ApiResponse({
    status: 404,
    description: "User does not exist.",
    type: GetUserStoriesUserNotFoundResponseDto,
  })
  @ApiResponse({
    status: 503,
    description: "Unable to connect to the database.",
    type: GetUserStoriesServiceUnavailableResponse,
  })
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

  @ApiOperation({
    summary: "Retrieve all information on a story",
    description: `Using the story ID, retrieve the all information about that story entry.`,
  })
  @ApiResponse({
    status: 200,
    description: `Successfully returns story info based on story ID.`,
    type: GetUserStoryResponseDto,
  })
  @ApiResponse({
    status: 400,
    description: `Invalid story ID given`,
    type: GetUserStoryInvalidStoryIDResponseDto,
  })
  @ApiResponse({
    status: 404,
    description: "Story is not found.",
    type: GetUserStoryNotFoundResponseDto,
  })
  @ApiResponse({
    status: 503,
    description: "Unable to connect to the database.",
    type: GetUserStoryServiceUnavailableResponseDto,
  })
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

  @ApiOperation({
    summary: "User is able to edit an existing story",
    description: `Using the story ID, the user is able to retrieve existing story, manually edit it, and save change.`,
  })
  @ApiResponse({
    status: 200,
    description: `Successfully update story entry info of story ID.`,
    type: EditStoryResponseDto,
  })
  @ApiResponse({
    status: 404,
    description: "Story is not found.",
    type: EditStoryNotFoundResponseDto,
  })
  @ApiResponse({
    status: 503,
    description: "Unable to connect to the database.",
    type: EditStoryServiceUnavailableResponseDto,
  })
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

  @ApiOperation({
    summary: "User is able to delete an existing story",
    description: `Using the story ID, the user is able to delete an existing story entry from story table.`,
  })
  @ApiResponse({
    status: 200,
    description: `Successfully delete story entry`,
    type: DeleteStoryResponseDto,
  })
  @ApiResponse({
    status: 404,
    description: "Story is not found.",
    type: DeleteStoryNotFoundResponseDto,
  })
  @ApiResponse({
    status: 503,
    description: "Unable to connect to the database.",
    type: DeleteStoryServiceUnavailableResponseDto,
  })
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
