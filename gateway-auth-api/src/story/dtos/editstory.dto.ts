import { IsNotEmpty } from "class-validator";

export class EditStoryDto {
  @IsNotEmpty()
  storyid: number;

  @IsNotEmpty()
  story: string;
}
