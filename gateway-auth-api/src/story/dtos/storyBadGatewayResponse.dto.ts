import { ApiProperty } from "@nestjs/swagger";

export class storyBadGatewayResponseDto {
  @ApiProperty({
    type: "number",
    default: "502",
    description: "HTTP status code for bad gateway.",
  })
  statusCode: number;

  @ApiProperty({
    type: "string",
    default: "Received an invalid response from ML server",
    description: "ML server is down and did not get a valid response from it.",
  })
  message: string;
}
