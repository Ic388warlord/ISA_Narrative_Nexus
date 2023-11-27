import { ApiProperty } from "@nestjs/swagger";

export class MeOkResponseDto {
  @ApiProperty({ default: 1 })
  id: number;

  @ApiProperty({ default: "test1" })
  username: string;

  @ApiProperty({ default: "test1@test.com" })
  email: string;

  @ApiProperty({ default: "USER" })
  role: string;
}

export class MeErrorResponseDto {
  @ApiProperty({ default: "Invalid token or token is blacklisted" })
  message: string;

  @ApiProperty({ default: "Unauthorized" })
  error: string;

  @ApiProperty({ default: 401 })
  statusCode: number;
}
