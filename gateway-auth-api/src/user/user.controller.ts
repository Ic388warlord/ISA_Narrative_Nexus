import { Body, Controller, Post } from "@nestjs/common";
import { UserService } from "./user.service";
import { RegisterDto } from "./dtos/register.dto";
import { Public } from "src/auth/auth.metadata";
import { ApiTags } from "@nestjs/swagger";

@ApiTags("User")
@Controller({
  path: "user",
  version: "1",
})
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Public()
  @Post("register")
  register(@Body() registerDto: RegisterDto) {
    console.log(registerDto);
    return this.userService.createUser(registerDto);
  }
}
