import { Injectable, NotFoundException } from '@nestjs/common';
import axios from 'axios';
import { StoryDto } from './dtos/story.dto';
import { SaveStoryDto } from './dtos/savestory.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class StoryService {
  constructor(
    private readonly primaService: PrismaService
  ) { }

  async generateStory(storyDto: StoryDto): Promise<any> {
    try {
      console.log("Check data: ", storyDto);
      const response = await axios.post('http://localhost:8000/api/v1/generateStory', storyDto);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async saveStory(saveStoryDto: SaveStoryDto): Promise<any> {
    try {
      // Check user in database
      const user = await this.primaService.user.findUnique({
        where: { username: saveStoryDto.username },
      });

      if (!user) {
        return {
          statusCode: 404,
          message: 'User does not exist',
        };
      }

      console.log("Check data: ", saveStoryDto);
      const newStory = await this.primaService.story.create({
        data: {
          username: saveStoryDto.username,
          story: saveStoryDto.story,
          genre: saveStoryDto.genre,
        },
      });
      console.log('Created story:', newStory);
      return {
        id: newStory.id,
        username: newStory.username,
        story: newStory.story,
        genre: newStory.genre,
        updatetime: newStory.updatedat
      };
    } catch (error) {
      throw error;
    }
  }

  async getUserStories(username: string) {
    try {
      const user = await this.primaService.user.findUnique({
        where: { username },
        include: { stories: true},
      });

      if (!user) {
        throw new NotFoundException('User is not found!');
      }

      return {stories: user.stories}
    } catch (error) {
      throw error;
    }
  }
}