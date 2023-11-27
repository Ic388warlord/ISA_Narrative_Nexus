import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class AllUserDataError {
  @ApiProperty({
    description: `"error message"`,
    example: "Invalid input",
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
