import { ApiProperty } from "@nestjs/swagger";

export class DeleteStoryServiceUnavailableResponseDto {
  @ApiProperty({
    type: "string",
    default: "Unable to connect to the database.",
    description:
      "The authentication server is unable to connect to the Prisma database.",
  })
  message: string;

  @ApiProperty({
    type: "string",
    default: "Service Unavailable",
    description: "HTTP status code description is service unavailable.",
  })
  error: string;

  @ApiProperty({
    type: "number",
    default: "503",
    description:
      "HTTP status code for service unavailable, in this case it is unable to connect to the database.",
  })
  statusCode: number;
}
