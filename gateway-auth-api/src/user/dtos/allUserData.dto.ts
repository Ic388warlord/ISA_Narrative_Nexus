import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class allUserData {
  @ApiProperty({
    default: [
      {
        id: 7,
        username: "admin",
        email: "admin@test.com",
        hash: "$2b$11$nJ74slAGfe4e9TIIDI6AKeRhuwh9XPT3SkIhd6ShPG9M1Fs/u1SC6",
        role: "ADMIN",
        firstname: "John",
      },
      {
        id: 8,
        username: "jane",
        email: "jane@test.com",
        hash: "$2b$11$nJ74slAGfe4e9TIIDVBGHNJKIUYTFDCVwh9XPT3SkIhd6ShPG9M1Fs/u1SC6",
        role: "USER",
        firstname: "Jane",
      },
    ],
  })
  data: string[];
}
