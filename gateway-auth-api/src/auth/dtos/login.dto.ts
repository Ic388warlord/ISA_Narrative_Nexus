import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsOptional } from "class-validator";

export class LoginDto {
  @ApiPropertyOptional({
    default: "rice@test.com",
  })
  @IsOptional()
  @IsEmail()
  email: string;

  @ApiProperty({
    minLength: 1,
    default: "rice",
  })
  @IsNotEmpty()
  password: string;

  @ApiProperty({
    minLength: 1,
    default: "rice",
  })
  @IsNotEmpty()
  username: string;
}

export class LoginOkResponseDto {
  @ApiProperty({ default: "Login successful" })
  message: string;
}

export class LoginErrorResponseDto {
  @ApiProperty({ default: "User does not exist or invalid credentials" })
  message: string;

  @ApiProperty({ default: "Unauthorized" })
  error: string;

  @ApiProperty({ default: 401 })
  statusCode: number;
}
