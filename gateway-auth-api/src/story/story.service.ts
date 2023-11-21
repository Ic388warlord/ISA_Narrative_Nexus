import { Injectable, NotFoundException } from "@nestjs/common";
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
      throw error;
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
      throw error;
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
      throw error;
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
      throw error;
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
      throw error;
    }
  }
}
