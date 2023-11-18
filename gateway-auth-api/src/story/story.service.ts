import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { StoryDto } from './dtos/story.dto';

@Injectable()
export class StoryService {
  async generateStory(storyDto: StoryDto): Promise<any> {
    try {
      console.log("Check data: ", storyDto);
      const response = await axios.post('http://localhost:8000/generate', storyDto);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
}