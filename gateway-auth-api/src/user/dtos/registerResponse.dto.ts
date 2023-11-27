import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class RegisterResponseDto {
  @IsEmail()
  @ApiProperty({
    description: `"User email"`,
    example: "john_doe@test.ca",
  })
  @IsNotEmpty()
  email: string;
  @ApiProperty({
    description: `"User login identifier"`,
    example: "john_doe",
  })
  @IsNotEmpty()
  username: string;
  @ApiProperty({
    description: `"User first name"`,
    example: "john",
  })
  @IsString()
  firstname: string;
  @ApiProperty({
    description: `"User newly created digit"`,
    example: "1",
  })
  @IsNotEmpty()
  id: string;
}
