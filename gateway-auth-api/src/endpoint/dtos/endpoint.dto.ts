import { IsEnum, IsNotEmpty, IsString } from "class-validator";
import { HttpMethod } from "@prisma/client";
import { ApiProperty, ApiQuery } from "@nestjs/swagger";

export class EndPointDto {
  @ApiProperty({enum: ['GET', 'POST', 'DELETE', 'PUT', 'PATCH'], description: 'HTTP method'})
  @IsEnum(HttpMethod)
  method: HttpMethod;

  @ApiProperty({description: "Name of Endpoint"})
  @IsString()
  @IsNotEmpty()
  name: string;
}
