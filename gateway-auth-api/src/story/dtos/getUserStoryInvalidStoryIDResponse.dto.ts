import { ApiProperty } from "@nestjs/swagger";

export class GetUserStoryInvalidStoryIDResponseDto {
  @ApiProperty({
    type: "string",
    default: "Invalid story ID given",
    description:
      "Getting story info requires a valid story ID, if story ID is not a number, it is not valid.",
  })
  message: string;

  @ApiProperty({
    type: "string",
    default: "Bad Request",
    description: "HTTP status code description is bad request.",
  })
  error: string;

  @ApiProperty({
    type: "number",
    default: "400",
    description:
      "HTTP status code for bad request, in this case the story ID is invalid.",
  })
  statusCode: number;
}
