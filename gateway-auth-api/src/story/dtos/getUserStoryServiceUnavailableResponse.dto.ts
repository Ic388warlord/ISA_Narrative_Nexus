import { ApiProperty } from "@nestjs/swagger";

export class GetUserStoryServiceUnavailableResponseDto {
  @ApiProperty({
    type: "number",
    default: "503",
    description:
      "HTTP status code for service unavailable, in this case it is unable to connect to the database.",
  })
  statusCode: number;

  @ApiProperty({
    type: "string",
    default: "Unable to connect to the database.",
    description:
      "The authentication server is unable to connect to the Prisma database.",
  })
  message: string;
}
