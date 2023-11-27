import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class AllUserRequestDto {
  @ApiProperty({
    default: [
      {
        id: 7,
        count: 400,
        username: "john_doe",
      },
      {
        id: 8,
        count: 10,
        username: "test_doe",
      },
      {
        id: 9,
        count: 100,
        username: "jane_doe",
      },
    ],
  })
  data: string[];
}
