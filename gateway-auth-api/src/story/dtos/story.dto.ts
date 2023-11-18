import { IsNotEmpty } from "class-validator";

export class StoryDto {
  @IsNotEmpty()
  sentence: string;

  @IsNotEmpty()
  genre: string;
}