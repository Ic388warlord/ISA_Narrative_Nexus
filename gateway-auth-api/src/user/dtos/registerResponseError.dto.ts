import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class RegisterResponseErrorDto {
  @ApiProperty({
    description: `"error message"`,
    example: "User already exists",
  })
  @IsString()
  message: string;
  @ApiProperty({
    description: `"error type"`,
    example: "Bad Request",
  })
  @IsString()
  error: string;
  @ApiProperty({
    description: `"status code"`,
    example: "400",
  })
  @IsString()
  statusCode: string;
}
