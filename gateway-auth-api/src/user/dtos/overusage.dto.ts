import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class OverusageDto {
  @ApiProperty({
    description: `"The user's count usage"`,
    example: true,
  })
  @IsNotEmpty()
  overUsage: boolean;
}
