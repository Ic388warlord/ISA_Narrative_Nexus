import { IsNotEmpty } from "class-validator";

export class ChangeRoleDto {
  @IsNotEmpty()
  role: string;

  @IsNotEmpty()
  username: string;
}
