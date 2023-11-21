import { IsNotEmpty } from "class-validator";

export class SaveStoryDto {
  @IsNotEmpty()
  story: string;

  @IsNotEmpty()
  genre: string;

  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  title: string;
}
