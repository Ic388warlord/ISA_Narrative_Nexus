import { ApiProperty } from "@nestjs/swagger";

export class DeleteStoryNotFoundResponseDto {
  @ApiProperty({
    type: "string",
    default: "Story is not found",
    description: "Story is not found for the given story ID.",
  })
  message: string;

  @ApiProperty({
    type: "string",
    default: "Not Found",
    description: "HTTP status code description is not found.",
  })
  error: string;

  @ApiProperty({
    type: "number",
    default: "404",
    description:
      "HTTP status code for not found, in this case its the story ID is not found",
  })
  statusCode: number;
}
