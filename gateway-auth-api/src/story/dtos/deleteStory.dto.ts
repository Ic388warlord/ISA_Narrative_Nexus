import { IsNotEmpty } from "class-validator";

export class DeleteStoryDto {
  @IsNotEmpty()
  storyid: number;
}
