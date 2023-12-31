import {
  Injectable,
  NotFoundException,
  BadRequestException,
  BadGatewayException,
  ServiceUnavailableException,
} from "@nestjs/common";
import axios from "axios";
import { StoryDto } from "./dtos/story.dto";
import { SaveStoryDto } from "./dtos/savestory.dto";
import { PrismaService } from "src/prisma/prisma.service";
import { StringService } from "src/util/util.service";
import { EditStoryDto } from "./dtos/editstory.dto";
import { DeleteStoryDto } from "./dtos/deleteStory.dto";

@Injectable()
export class StoryService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly stringService: StringService,
  ) {}

  async generateStory(storyDto: StoryDto): Promise<any> {
    try {
      console.log(this.stringService.story.LOG_DATA, storyDto);
      const response = await axios.post(this.stringService.story.URL, storyDto);
      return response.data;
    } catch (error) {
      console.log(error);
      throw new BadGatewayException(this.stringService.story.AXIOS_ERROR);
    }
  }

  async editStory(editStoryDto: EditStoryDto): Promise<any> {
    try {
      const existingStory = await this.prismaService.story.findUnique({
        where: {
          id: editStoryDto.storyid,
        },
      });

      if (!existingStory) {
        throw new NotFoundException(this.stringService.story.STORY_NOT_FOUND);
      }

      const updatedStory = await this.prismaService.story.update({
        where: { id: editStoryDto.storyid },
        data: { story: editStoryDto.story },
      });
      return {
        message: this.stringService.story.UPDATED_STORY_MSG,
        updatedStory: updatedStory,
      };
    } catch (error) {
      console.log(error);
      throw new ServiceUnavailableException(
        this.stringService.story.DATABASE_ERROR,
      );
    }
  }

  async deleteStory(deleteStoryDto: DeleteStoryDto): Promise<any> {
    try {
      const deletedStory = await this.prismaService.story.delete({
        where: { id: deleteStoryDto.storyid },
      });

      return {
        message: this.stringService.story.DELETED_STORY_MSG,
        deletedStory: deletedStory,
      };
    } catch (error) {
      if (error.code === this.stringService.story.PRISMA_ERROR_CODE) {
        throw new NotFoundException(this.stringService.story.STORY_NOT_FOUND);
      }
      console.error(error);
      throw new ServiceUnavailableException(
        this.stringService.story.DATABASE_ERROR,
      );
    }
  }

  async saveStory(saveStoryDto: SaveStoryDto): Promise<any> {
    try {
      // Check user in database
      const user = await this.prismaService.user.findUnique({
        where: { username: saveStoryDto.username },
      });

      if (!user) {
        return {
          statusCode: 404,
          message: this.stringService.story.USER_NOT_FOUND,
        };
      }

      console.log(this.stringService.story.LOG_DATA, saveStoryDto);
      const newStory = await this.prismaService.story.create({
        data: {
          username: saveStoryDto.username,
          title: saveStoryDto.title,
          story: saveStoryDto.story,
          genre: saveStoryDto.genre,
        },
      });
      console.log(this.stringService.story.LOG_STORY, newStory);
      return {
        id: newStory.id,
        username: newStory.username,
        title: newStory.title,
        story: newStory.story,
        genre: newStory.genre,
        updatetime: newStory.updatedat,
      };
    } catch (error) {
      throw new ServiceUnavailableException(
        this.stringService.story.DATABASE_ERROR,
      );
    }
  }

  async getUserStories(username: string) {
    try {
      const user = await this.prismaService.user.findUnique({
        where: { username },
        include: { stories: true },
      });

      if (!user) {
        throw new NotFoundException(this.stringService.story.USER_NOT_FOUND);
      }

      return { stories: user.stories };
    } catch (error) {
      throw new ServiceUnavailableException(
        this.stringService.story.DATABASE_ERROR,
      );
    }
  }

  async getUserStory(storyid: number) {
    try {
      if (isNaN(storyid) || storyid <= 0) {
        throw new BadRequestException(this.stringService.story.INVALID_STORYID);
      }

      const story = await this.prismaService.story.findUnique({
        where: { id: storyid },
      });

      if (!story) {
        throw new NotFoundException(this.stringService.story.STORY_NOT_FOUND);
      }

      return {
        message: this.stringService.story.STORY_FOUND,
        storyinfo: story,
      };
    } catch (error) {
      throw new ServiceUnavailableException(
        this.stringService.story.DATABASE_ERROR,
      );
    }
  }
}
