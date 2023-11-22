import { IsNotEmpty, IsString } from "class-validator";

export class RequestCountDto {
  @IsString()
  @IsNotEmpty()
  username: string;
}
