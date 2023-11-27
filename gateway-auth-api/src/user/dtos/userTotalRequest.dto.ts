import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class UserTotalRequestDto {
  @ApiProperty({
    description: `"User's unique ID"`,
    example: "1",
  })
  @IsNotEmpty()
  id: string;
  @ApiProperty({
    description: `"Total user's count"`,
    example: "20",
  })
  @IsNotEmpty()
  count: string;
  @ApiProperty({
    description: `"User's username"`,
    example: "john_doe",
  })
  @IsString()
  username: string;
}
