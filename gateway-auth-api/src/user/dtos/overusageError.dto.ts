import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class OverusageErrorDto {
  @ApiProperty({
    description: `"message"`,
    example: "Invalid Token",
  })
  @IsNotEmpty()
  message: string;
  @ApiProperty({
    description: `"error"`,
    example: "Unauthorized",
  })
  @IsNotEmpty()
  error: string;
  @ApiProperty({
    description: `"status code"`,
    example: "401",
  })
  @IsNotEmpty()
  statusCode: string;
}
