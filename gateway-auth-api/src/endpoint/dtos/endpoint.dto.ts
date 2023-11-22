import { IsEnum, IsNotEmpty, IsString } from "class-validator";
import { HttpMethod } from "@prisma/client";

export class EndPointDto {
  @IsEnum(HttpMethod)
  method: HttpMethod;

  @IsString()
  @IsNotEmpty()
  name: string;
}
