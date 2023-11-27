import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class StoryDto {
  @IsNotEmpty()
  @ApiProperty({ default: "I'm so " })
  sentence: string;

  @IsNotEmpty()
  @ApiProperty({ default: "drama" })
  genre: string;
}
