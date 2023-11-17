import { IsEmail, IsNotEmpty, IsOptional } from "class-validator";

export class LoginDto {
  @IsOptional()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  username: string;
}
