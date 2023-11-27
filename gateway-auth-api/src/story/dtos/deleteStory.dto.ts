import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class DeleteStoryDto {
  @IsNotEmpty()
  @ApiProperty({ default: 14 })
  storyid: number;
}
