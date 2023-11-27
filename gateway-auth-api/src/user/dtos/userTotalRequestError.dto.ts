import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class UserTotalRequestErrorDto {
  @ApiProperty({
    description: `"Error Message"`,
    example: "User does not exist.",
  })
  @IsString()
  message: string;
  @ApiProperty({
    description: `"Error Type"`,
    example: "Not Found",
  })
  @IsString()
  error: string;
  @ApiProperty({
    description: `"Status code"`,
    example: "404",
  })
  @IsString()
  statusCode: string;
}
