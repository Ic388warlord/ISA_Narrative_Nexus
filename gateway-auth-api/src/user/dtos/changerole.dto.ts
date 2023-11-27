import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class ChangeRoleDto {
  @IsNotEmpty()
  role: string;

  @IsNotEmpty()
  username: string;
}

export class ChangeRoleOkResponseDto {
  @ApiProperty({ default: "Updated role successfully" })
  message: string;
}
