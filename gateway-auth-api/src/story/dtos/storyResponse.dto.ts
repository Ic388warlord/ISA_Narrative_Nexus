import { ApiProperty } from "@nestjs/swagger";

export class StoryResponseDto {
  @ApiProperty({
    default:
      "I'm so close to my wife. Her name is Lily. From the beginning, I thought Lily was a good girl, an example of a girl who was passionate",
  })
  sentence: string;

  @ApiProperty({
    default: "drama",
  })
  genre: string;
}
