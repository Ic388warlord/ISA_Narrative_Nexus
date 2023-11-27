import { ApiProperty } from "@nestjs/swagger";

export class LogoutOkResponseDto {
  @ApiProperty({ default: "Successful signout" })
  message: string;
}

export class LogoutErrorResponseDto {
  @ApiProperty({ default: "Invalid token" })
  message: string;

  @ApiProperty({ default: "Unauthorized" })
  error: string;

  @ApiProperty({ default: 401 })
  statusCode: number;
}
