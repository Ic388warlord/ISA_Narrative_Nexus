import { ApiProperty } from "@nestjs/swagger";

export class GetUserStoriesUserNotFoundResponseDto {
  @ApiProperty({
    type: "string",
    default: "User does not exist",
    description:
      "Getting a list of stories requires a username, if username does not exist, cannot retrieve list of story.",
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
      "HTTP status code for not found, in this case its the username is not found",
  })
  statusCode: number;
}
