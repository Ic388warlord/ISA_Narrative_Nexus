import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class ChangeRoleDto {
  @ApiProperty({
    description: `"The·role·of·the·User"`,
    example: "ADMIN",
  })
  @IsNotEmpty()
  role: string;
  @ApiProperty({
    description: `"The·username·of·the·User"`,
    example: "john_doe",
  })
  @IsNotEmpty()
  username: string;
}
